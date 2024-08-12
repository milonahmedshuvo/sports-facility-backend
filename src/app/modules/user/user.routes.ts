import express from 'express'
import { userController } from './user.controller'
import { UserValidation } from './user.validation'
import validationRequist from '../../middleware/validationRequist'

const router = express.Router()






router.post('/create', validationRequist(UserValidation.createUserValidationSchema), userController.createUser)







export const userRoutes = router