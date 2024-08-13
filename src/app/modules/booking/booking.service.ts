import { number } from "zod";
import AppError from "../../error/apperror";
import { TFacility } from "../facility/facility.interface";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { getAvailableTimeSlots } from "../../utils/getAvailableTimeSlots";

const createBookingIntoDB = async (payload:TBooking) => {
      
     const facility = await Facility.findById(payload.facility)

     if(!facility){
        throw new AppError(400, 'Facility not found!!')
     }

     // Access the pricePerHour property 
     const pricePerHour = facility.pricePerHour 
     console.log({pricePerHour})

    // Parse the start time and end time strings
    const [startHour, startMinute] =payload.startTime.split(':').map(Number);
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
    payload.payableAmount = pricePerHour * diffHours
    payload.date= todayDate




     const result = await Booking.create(payload)
     return result
   
}





const getAllBookingFromDB = async () => {

    const result = await Booking.find().populate('user').populate('facility')
    return(result)
}




const queryCheckAvailabilityFromDB = async (query:Record<string, unknown>) => {
     // Get the year, month, and day format YY/MM/DD
     const today = new Date();

     const year = today.getFullYear();
     const month = String(today.getMonth() + 1).padStart(2, '0'); 
     const day = String(today.getDate()).padStart(2, '0');
 
     const todayDate = `${year}-${month}-${day}`;


    const date = query.date || todayDate
    


    const bookings = await Booking.find({date})
    
    if(!bookings) {
        throw new AppError(404, 'Booking not found!!')
    }


    

   const  getTimeSlots  =  getAvailableTimeSlots(bookings)

   return getTimeSlots
}











const getAllBookingByUserFromDB = async (jwtPayload:JwtPayload) => {
 
    const user = await User.findOne({email: jwtPayload.email, role: jwtPayload.role})

    if(!user) {
        throw new AppError(404, 'user not found!!')
    }


    const booking = await Booking.findOne({user: user._id}).populate('user').populate('facility')
    

    return booking
}




const deleteBookingFromDB = async (id:string) => {

    const result = await Booking.findByIdAndUpdate(id, {isBooked: 'canceled'}, {new: true})
    return result
}


export const bookingService = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getAllBookingByUserFromDB,
    deleteBookingFromDB,
    queryCheckAvailabilityFromDB
}