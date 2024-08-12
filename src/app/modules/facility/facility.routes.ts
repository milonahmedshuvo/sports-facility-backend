import express from 'express'
import { facilityController } from './facility.controller'
import auth from '../../middleware/auth'
import { user_role } from './facility.constant'

const router = express.Router()




router.post('/create',auth(user_role.admin), facilityController.createFacilty)



export const facilityRoutes = router