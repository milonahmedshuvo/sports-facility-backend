import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";




const createBooking = async (req:Request, res:Response, next:NextFunction) => {
         
      // console.log('user', req.user)
      try{
        const result = await bookingService.createBookingIntoDB(req.body.data, req.user)


        res.status(200).json({
            success: true,
            message: 'Booking added successfully',
            data: result
        })


      }catch(err){
        next(err)
      }
}






const getAllBookings = async (req:Request, res:Response, next:NextFunction) => {
      
    try{
      const result = await bookingService.getAllBookingFromDB()

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
      })


    }catch(err){
      next(err)
    }
}






const getUserAllBooking = async (req:Request, res:Response, next:NextFunction) => {
      
      
  try{
    const result = await bookingService.getUserAllBookingFromDB(req.user)

  


    res.status(200).json({
        success: true,
        message: 'Bookings retrieved successfully',
        data: result
    })


  }catch(err){
    next(err)
  }
}









const queryCheckAvailability = async (req:Request, res:Response, next:NextFunction) => {
       
     
     
  try{
    
    const result = await bookingService.queryCheckAvailabilityFromDB(req.query)

  


    res.status(200).json({
        success: true,
        message: 'Bookings retrieved successfully',
        data: result
    })


  }catch(err){
    next(err)
  }
}











const getAllBookingByUser = async (req:Request, res:Response, next:NextFunction) => {
      
    try{
        // const token = req.headers.authorization
        const token = req.user

      const result = await bookingService.getAllBookingByUserFromDB(token)


     


      res.status(200).json({
          success: true,
          message: 'Bookings retrieved successfully',
          data: result
      })


    }catch(err){
      next(err)
    }
}





const deleteBooking = async (req:Request, res:Response, next:NextFunction) => {
      
    try{
        const {id} = req.params

      const result = await bookingService.deleteBookingFromDB(id)


      res.status(200).json({
          success: true,
          message: 'Booking cancelled successfully',
          data: result
      })


    }catch(err){
      next(err)
    }
}


export const bookingController = {
    createBooking,
    getAllBookings,
    getAllBookingByUser,
    deleteBooking,
    queryCheckAvailability,
    getUserAllBooking
}