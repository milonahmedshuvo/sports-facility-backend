"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regex for YYYY-MM-DD format
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            },
            message: 'Date must be in YYYY-MM-DD format'
        }
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Facility',
        unique: true,
        required: true,
    },
    payableAmount: {
        type: Number,
        required: true,
    },
    isBooked: {
        type: String,
        default: 'confirmed'
    }
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
