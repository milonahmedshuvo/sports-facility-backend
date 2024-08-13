"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSourse = err.issues.map(val => {
        return {
            path: val.path[val.path.length - 1],
            message: val.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Error',
        errorSourse
    };
};
exports.default = handleZodError;
