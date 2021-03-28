const express = require('express');
const verifyAccount = require('../middlewares/verifyAccount');
const accountRoute = express.Router();

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
})

module.exports = accountRoute;