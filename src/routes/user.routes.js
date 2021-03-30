const express = require('express');
const { v4: uuidv4 } = require('uuid');
const verifyAccount = require('../middlewares/verifyAccount');



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

userRouter.put('/', verifyAccount, (request, response) => {
  const { name } = request.body;
  const {customer } = request;
  customer.name = name;
  
  return response.status(201).send();
});

userRouter.get("/", verifyAccount, (request, response) =>  {
  const {customer} = request;

  return response.json(customer);
});

userRouter.delete('/', verifyAccount, (request, response) => {
  const { customer } = request;

  //splice
  customers.splice(customer, 1);

  return response.status(200).json(customers);
})


module.exports = userRouter;