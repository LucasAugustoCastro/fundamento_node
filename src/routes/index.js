
const express = require('express');
const userRouter = require('./user.routes');
const accountRouter = require('./account.routes');
const route = express.Router()
global.customers = [];
route.use('/user', userRouter);
route.use('/account', accountRouter);


module.exports = route;