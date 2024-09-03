import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validationRequist = (validationZodSchema:AnyZodObject) => {
   
    return async (req:Request, res:Response, next:NextFunction) =>{
       
        
           console.log('ata zood middle vitor', req.body.data)
        try{

            await validationZodSchema.parseAsync({
                body: req.body.data,
            }) 

            next()
           
        }catch(err){
            next(err)
        }
    }
 }



 export default validationRequist