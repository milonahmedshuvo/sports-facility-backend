import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.routes'
import config from './app/config'
import { TErrorSoursePattern } from './app/error/error.interface'
import handleMongooseError from './app/error/handleMongoose.Error'
const app = express()


// middleware set 
app.use(express.json())
app.use(cors())



// application routes 
app.use('/api/v1/user', userRoutes)




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
    let simplefiedError = handleMongooseError(err)
    statusCode = simplefiedError.statusCode
    message = simplefiedError.message
    errorSoursePattern = simplefiedError.errorSource
  }




  res.status(statusCode).json({
    success: 'false it golobar error',
    message: message,
    name: err.name,
    errorSoursePattern,
    error: err,
    stack: config.node_env === 'development' ? err.stack : null
  })
})




// Not Found page Handaler
app.use((req:Request, res:Response, next:NextFunction) => {
    
  res.status(404).json({
     success: false,
     message: "Page route not Found",
     error: ""
  })
})





app.get('/', (req, res) => {
  res.send('Sports Facility server is runing....')
})


export default app