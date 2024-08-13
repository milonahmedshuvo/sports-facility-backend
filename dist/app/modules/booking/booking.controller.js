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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_service_1.bookingService.createBookingIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: 'Booking added successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_service_1.bookingService.getAllBookingFromDB();
        //   not data found 
        if (result.length === 0) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No Data Found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const queryCheckAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_service_1.bookingService.queryCheckAvailabilityFromDB(req.query);
        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllBookingByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const token = req.headers.authorization
        const token = req.user;
        const result = yield booking_service_1.bookingService.getAllBookingByUserFromDB(token);
        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield booking_service_1.bookingService.deleteBookingFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
exports.bookingController = {
    createBooking,
    getAllBookings,
    getAllBookingByUser,
    deleteBooking,
    queryCheckAvailability
};
