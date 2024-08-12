import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validationRequist = (validationZodSchema:AnyZodObject) => {
   
    return async (req:Request, res:Response, next:NextFunction) =>{
       
        try{

            await validationZodSchema.parseAsync({
                body: req.body,
            }) 

            next()
           
        }catch(err){
            next(err)
        }
    }
 }



 export default validationRequist