const CustomError  = require('./../util/CustomError')
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const handleCastErrorDB = err => {
    const message = `inValid ${err.path}: ${err.value}`;
    return new CustomError(message, 404);
};
const handleValidationDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `invalid input data. ${errors.join('. ')}`;
    return new CustomError(message, 400);
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }else if (process.env.NODE_ENV === 'production') {
        let error = Object.create(err);
        console.log(error)
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.name === 'ValidationError') error = handleValidationDB(error);
        sendErrorProd(error, res);
    }
}