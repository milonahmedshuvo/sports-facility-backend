"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const apperror_1 = __importDefault(require("../../error/apperror"));
const facility_model_1 = require("../facility/facility.model");
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../user/user.model");
const getAvailableTimeSlots_1 = require("../../utils/getAvailableTimeSlots");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facility_model_1.Facility.findById(payload.facility);
    if (!facility) {
        throw new apperror_1.default(400, 'Facility not found!!');
    }
    // Access the pricePerHour property 
    const pricePerHour = facility.pricePerHour;
    // Parse the start time and end time strings
    const [startHour, startMinute] = payload.startTime.split(':').map(Number);
    const [endHour, endMinute] = payload.endTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    // Get the year, month, and day format YY/MM/DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = payload.date || `${year}-${month}-${day}`;
    // set payableAmount 
    payload.payableAmount = pricePerHour * diffHours;
    payload.date = todayDate;
    const result = yield booking_model_1.Booking.create(payload);
    return result;
});
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('user').populate('facility');
    return (result);
});
const queryCheckAvailabilityFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the year, month, and day format YY/MM/DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${year}-${month}-${day}`;
    const date = query.date || todayDate;
    const bookings = yield booking_model_1.Booking.find({ date });
    if (!bookings) {
        throw new apperror_1.default(404, 'Booking not found!!');
    }
    const getTimeSlots = (0, getAvailableTimeSlots_1.getAvailableTimeSlots)(bookings);
    return getTimeSlots;
});
const getAllBookingByUserFromDB = (jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: jwtPayload.email, role: jwtPayload.role });
    if (!user) {
        throw new apperror_1.default(404, 'user not found!!');
    }
    const booking = yield booking_model_1.Booking.findOne({ user: user._id }).populate('user').populate('facility');
    return booking;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: 'canceled' }, { new: true });
    return result;
});
exports.bookingService = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getAllBookingByUserFromDB,
    deleteBookingFromDB,
    queryCheckAvailabilityFromDB
};
