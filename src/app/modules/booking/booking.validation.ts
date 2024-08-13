import { z } from "zod";


// Regex pattern for YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;


// make hours and time formet by rezax 10:30
const timeStringSchema = z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, { message: 'Invalid time format , expected "HH:MM" in 24 hours format' })




const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string().regex(dateRegex, "Date must be in YYYY-MM-DD format").optional(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        user: z.string(),
        facility: z.string(),
    })
})



export const BookingValidation = {
    createBookingValidationSchema
}