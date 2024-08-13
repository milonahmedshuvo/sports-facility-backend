"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./app/modules/user/user.routes");
const config_1 = __importDefault(require("./app/config"));
const handleMongoose_Error_1 = __importDefault(require("./app/error/handleMongoose.Error"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("./app/error/handleZodError"));
const auth_routes_1 = require("./app/modules/auth/auth.routes");
const apperror_1 = __importDefault(require("./app/error/apperror"));
const facility_routes_1 = require("./app/modules/facility/facility.routes");
const booking_routes_1 = require("./app/modules/booking/booking.routes");
const app = (0, express_1.default)();
// middleware set 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes 
app.use('/api/v1/user', user_routes_1.userRoutes);
app.use('/api/v1/user-login', auth_routes_1.authRoutes);
app.use('/api/v1/facility', facility_routes_1.facilityRoutes);
app.use('/api/v1/booking', booking_routes_1.bookingRoutes);
// Golobar error handeling 
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something wrong';
    let errorSoursePattern = [
        {
            path: '',
            message: 'Something wrong'
        }
    ];
    if (err.name === 'ValidationError') {
        const simplefiedError = (0, handleMongoose_Error_1.default)(err);
        statusCode = simplefiedError.statusCode;
        message = simplefiedError.message;
        errorSoursePattern = simplefiedError.errorSource;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplefiedZodError = (0, handleZodError_1.default)(err);
        statusCode = simplefiedZodError.statusCode;
        message = simplefiedZodError.message;
        errorSoursePattern = simplefiedZodError.errorSourse;
    }
    else if (err instanceof apperror_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSoursePattern = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    res.status(statusCode).json({
        success: 'false it golobar error',
        message: message,
        errorSoursePattern,
        stack: config_1.default.node_env === 'development' ? err.stack : null
    });
});
app.get('/', (req, res) => {
    res.send('Sports Facility server is runing....');
});
// Not Found page Handaler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page route not Found",
        error: ""
    });
});
exports.default = app;
