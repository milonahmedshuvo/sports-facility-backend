import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req:Request, res:Response, next:NextFunction) => {

     try{
        const result = await userService.createUserIntoDB(req.body)

        res.status(200).json({
          success: true,
          message: "User registered successfully",
          data: result
        })

     }catch(err){
        next(err)
     }
}










export const userController = {
    createUser
}