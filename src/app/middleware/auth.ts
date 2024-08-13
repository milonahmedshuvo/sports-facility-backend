import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../error/apperror"
import { TUserRole } from "../modules/facility/facility.interface"
import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken'
import config from "../config"


const auth = (...requistUserRole:TUserRole[]) => {


    return catchAsync(async (req:Request, res:Response, next:NextFunction ) => {

        const token = req.headers.authorization
       

        if(!token) {
            throw new AppError(400, 'Authentication token is unvalid!!')
        }



       const decoded = jwt.verify(token, config.access_token_scret as string,)as JwtPayload
       
       const { role } = decoded;

    

       
       // check role such user and admin 
      //  const role = (decoded as JwtPayload).role 
        //   const role = decoded.role 
       

       if(requistUserRole && !requistUserRole.includes(role)) {
           
           throw new AppError(401, 'You have no access to this route')
       }

       


       req.user = decoded as JwtHeader
       next()

          
    })
}



export default auth