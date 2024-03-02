const express = require('express');
const morgan = require('morgan');
const foodRouter = require('./routes/FoodRoute');
const app = express();
const CustomError  = require('./util/CustomError')
const globalErrorHandler = require('./controller/ErrorController')


app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/food", foodRouter);

app.all('*', (req, res, next) => {
    console.log(req.originalUrl);
    next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

module.exports = app;