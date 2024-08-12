import mongoose from "mongoose"

const handleMongooseError = (err:mongoose.Error.ValidationError) => {

    const errorSource = Object.values(err.errors).map( val => {

        return {
            path : val.path,
            message: val.message
        }
    })

    let statusCode = 400


    
    return {
        statusCode,
        message: 'Mongoose validation error',
        errorSource  
    }
}



export default handleMongooseError