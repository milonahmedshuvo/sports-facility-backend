"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const validationRequist_1 = __importDefault(require("../../middleware/validationRequist"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const facility_constant_1 = require("../facility/facility.constant");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(facility_constant_1.user_role.user), (0, validationRequist_1.default)(booking_validation_1.BookingValidation.createBookingValidationSchema), booking_controller_1.bookingController.createBooking);
router.get('/all', (0, auth_1.default)(facility_constant_1.user_role.admin), booking_controller_1.bookingController.getAllBookings);
router.get('/user', (0, auth_1.default)(facility_constant_1.user_role.user), booking_controller_1.bookingController.getAllBookingByUser);
router.delete('/delete/:id', (0, auth_1.default)(facility_constant_1.user_role.user), booking_controller_1.bookingController.deleteBooking);
router.get('/check-availability', booking_controller_1.bookingController.queryCheckAvailability);
exports.bookingRoutes = router;
