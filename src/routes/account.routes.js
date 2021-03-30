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

accountRoute.get('/statement/date', (request, response) => {
  const {customer } = request;
  const {date} = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter((statement) => 
    statement.created_at.toDateString() === new Date(dateFormat).toDateString());

  return response.json(statement);
})

accountRoute.get('/balance', (request, response) => {
  const {customer} = request;

  const balance = getBalance(customer.statement);
  return response.json(balance);
})

module.exports = accountRoute;