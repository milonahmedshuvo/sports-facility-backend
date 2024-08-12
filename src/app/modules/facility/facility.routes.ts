import express from 'express'
import { facilityController } from './facility.controller'
import auth from '../../middleware/auth'
import { user_role } from './facility.constant'
import validationRequist from '../../middleware/validationRequist'
import { facilityValidationSchema } from './facility.validation'

const router = express.Router()




router.post('/create', validationRequist(facilityValidationSchema.createFacilityValidationSchema), auth(user_role.admin), facilityController.createFacilty)

router.put('/update/:id', validationRequist(facilityValidationSchema.updateFacilityValidationSchema), auth(user_role.admin), facilityController.updateFacilty )


export const facilityRoutes = router