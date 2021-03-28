const express = require('express');
const { v4: uuidv4 } = require('uuid');


const userRouter = express.Router();



userRouter.post("/", (request, response) => {
  const { cpf, name, email } = request.body;
  
  const cpfCustomerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );
  const emailCustomerAlreadyExists = customers.some(
    (customer) => customer.email === email
  );

  if(cpfCustomerAlreadyExists) {
    return response.status(400).json({error: 'CPF already exists!'})
  }
  if(emailCustomerAlreadyExists){
    return response.status(400).json({error: 'Email already exists!'})
  }

  customers.push({
    cpf,
    name,
    email,
    id: uuidv4,
    statement: []
  });

  return response.status(201).send();

});

module.exports = userRouter;