// const {request, response} = require('express');
function verifyIfExistAccountCPF(request, response, next){
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);
  if(!customer){
    return response.status(400).json({error: 'Customer not found!'})
  }

  request.customer = customer;
  
  return next();
}

module.exports = verifyIfExistAccountCPF;