"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableTimeSlots = getAvailableTimeSlots;
function getAvailableTimeSlots(bookings) {
    const dayStart = '08:00';
    const dayEnd = '18:00';
    // // Parse the day start and end times
    // const dayStartTime = new Date(`1970-01-01T${dayStart}:00Z`).getTime();
    // const dayEndTime = new Date(`1970-01-01T${dayEnd}:00Z`).getTime();
    let availableSlots = [{ startTime: dayStart, endTime: dayEnd }];
    bookings.forEach((booking) => {
        const bookingStartTime = new Date(`1970-01-01T${booking.startTime}:00Z`).getTime();
        const bookingEndTime = new Date(`1970-01-01T${booking.endTime}:00Z`).getTime();
        availableSlots = availableSlots.flatMap(slot => {
            const slotStartTime = new Date(`1970-01-01T${slot.startTime}:00Z`).getTime();
            const slotEndTime = new Date(`1970-01-01T${slot.endTime}:00Z`).getTime();
            if (bookingStartTime >= slotEndTime || bookingEndTime <= slotStartTime) {
                return [slot];
            }
            else {
                const newSlots = [];
                if (bookingStartTime > slotStartTime) {
                    newSlots.push({
                        startTime: slot.startTime,
                        endTime: new Date(bookingStartTime).toISOString().substring(11, 16)
                    });
                }
                if (bookingEndTime < slotEndTime) {
                    newSlots.push({
                        startTime: new Date(bookingEndTime).toISOString().substring(11, 16),
                        endTime: slot.endTime
                    });
                }
                return newSlots;
            }
        });
    });
    return availableSlots;
}
