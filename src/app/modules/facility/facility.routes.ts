import express from 'express'
import { facilityController } from './facility.controller'
import auth from '../../middleware/auth'
import { user_role } from './facility.constant'



const router = express.Router()



router.post('/create',  auth(user_role.admin), facilityController.createFacilty)

router.put('/update/:id', facilityController.updateFacilty )

router.delete('/delete/:id', auth(user_role.admin), facilityController.deleteFacilty )
router.get('/all', facilityController.getAllFacilty )
router.get('/single/:id', facilityController.getSingleFacilty )



export const facilityRoutes = router