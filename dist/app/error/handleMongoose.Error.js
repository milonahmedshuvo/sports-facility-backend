"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (err) => {
    const errorSource = Object.values(err.errors).map(val => {
        return {
            path: val.path,
            message: val.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Mongoose validation error',
        errorSource
    };
};
exports.default = handleMongooseError;
