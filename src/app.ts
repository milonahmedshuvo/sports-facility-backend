import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.routes'
import config from './app/config'
import { TErrorSoursePattern } from './app/error/error.interface'
import handleMongooseError from './app/error/handleMongoose.Error'
import { ZodError } from 'zod'
import handleZodError from './app/error/handleZodError'
import { authRoutes } from './app/modules/auth/auth.routes'
import AppError from './app/error/apperror'
import { facilityRoutes } from './app/modules/facility/facility.routes'
import { bookingRoutes } from './app/modules/booking/booking.routes'
const app = express()


// middleware set 
app.use(express.json())
app.use(cors())



// application routes 
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/user-login', authRoutes)
app.use('/api/v1/facility', facilityRoutes)
app.use('/api/v1/booking', bookingRoutes)




// Golobar error handeling 
app.use((err:any, req:Request, res:Response, next:NextFunction ) => {

  let statusCode = err.statusCode || 500
  let message = err.message || 'Something wrong'
  let errorSoursePattern:TErrorSoursePattern = [
    {
      path: '',
      message: 'Something wrong'
    }
  ] 



  if(err.name === 'ValidationError'){
    const simplefiedError = handleMongooseError(err)
    statusCode = simplefiedError.statusCode
    message = simplefiedError.message
    errorSoursePattern = simplefiedError.errorSource
  }else if(err instanceof ZodError){
    const simplefiedZodError = handleZodError(err)
    statusCode = simplefiedZodError.statusCode
    message = simplefiedZodError.message
    errorSoursePattern = simplefiedZodError.errorSourse
  }else if(err instanceof AppError){
    statusCode = err.statusCode
    message = err.message
    errorSoursePattern = [
      {
        path: '',
        message: err.message
      }
    ]
  }




  res.status(statusCode).json({
    success: 'false it golobar error',
    message: message,
    errorSoursePattern,
    stack: config.node_env === 'development' ? err.stack : null
  })
})


app.get('/', (req, res) => {
  res.send('Sports Facility server is runing....')
})




// Not Found page Handaler
app.use((req:Request, res:Response, next:NextFunction) => {
    
  res.status(404).json({
     success: false,
     message: "Page route not Found",
     error: ""
  })
})








export default app