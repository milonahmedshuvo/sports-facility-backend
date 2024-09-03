import express from 'express'
import { userController } from './user.controller'
import { UserValidation } from './user.validation'
import validationRequist from '../../middleware/validationRequist'
import auth from '../../middleware/auth'
import { user_role } from '../facility/facility.constant'

const router = express.Router()






router.post('/create', validationRequist(UserValidation.createUserValidationSchema), userController.createUser)
router.get('/single',auth(user_role.user, user_role.admin ), userController.getUserInfo)
// user_role.user || 


// admin create 
router.post('/createAdmin', validationRequist(UserValidation.createUserValidationSchema), userController.createAdmin)

export const userRoutes = router