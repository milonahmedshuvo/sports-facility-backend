import { ZodError } from "zod";
import { TErrorSoursePattern } from "./error.interface";

const handleZodError = (err:ZodError) => {

    const errorSourse:TErrorSoursePattern = err.issues.map(val => {

        return {
            path: val.path[val.path.length -1],
            message: val.message
        }
    })

    const statusCode = 400

    return {
        statusCode,
        message: 'Zod Error',
        errorSourse
    }
}



export default handleZodError;