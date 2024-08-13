import express from 'express'
import { bookingController } from './booking.controller'
import validationRequist from '../../middleware/validationRequist'
import { BookingValidation } from './booking.validation'
import auth from '../../middleware/auth'
import { user_role } from '../facility/facility.constant'


const router = express.Router()


router.post('/create', auth(user_role.user), validationRequist(BookingValidation.createBookingValidationSchema), bookingController.createBooking)
router.get('/all', auth(user_role.admin), bookingController.getAllBookings)
router.get('/user', auth(user_role.user), bookingController.getAllBookingByUser )
router.delete('/delete/:id', auth(user_role.user), bookingController.deleteBooking)
router.get('/check-availability', bookingController.queryCheckAvailability )





export const bookingRoutes = router