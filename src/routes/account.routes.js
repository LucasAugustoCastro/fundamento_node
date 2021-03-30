const express = require('express');
const verifyAccount = require('../middlewares/verifyAccount');
const accountRoute = express.Router();

function getBalance(statement){
  const balance = statement.reduce((acc, operation) => {
    if(operation.type == 'credit'){
      return acc+ operation.amount;
    }else{
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

accountRoute.use(verifyAccount);

accountRoute.get('/statement', (request, response) => {
  const {customer} = request;

  return response.json(customer.statement);
})

accountRoute.post('/deposit', (request, response) => {
  const {description, amount} = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);

  return response.status(201).send();
})

accountRoute.post('/withdraw', (request, response) => {
  const { amount } = request.body;

  const {customer} = request;

  const balance = getBalance(customer.statement);
  if(balance < amount){
    return response.status(400).json({error: "Insufficient funds!"});
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
})

module.exports = accountRoute;