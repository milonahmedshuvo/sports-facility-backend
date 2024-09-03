import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req:Request, res:Response, next:NextFunction) => {

     try{
        const result = await userService.createUserIntoDB(req.body.data)

        res.status(200).json({
          success: true,
          message: "User registered successfully",
          data: result
        })

     }catch(err){
        next(err)
     }
}


// create admin 
const createAdmin = async (req:Request, res:Response, next:NextFunction) => {

   try{
      const result = await userService.createAdminIntoDB(req.body.data)

      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: result
      })

   }catch(err){
      next(err)
   }
}





const getUserInfo = async (req:Request, res:Response, next:NextFunction) => {

      //  console.log("controller decode:", req.user)
       
   try{
      const result = await userService.getUserInformationFromDB(req.user)

      res.status(200).json({
        success: true,
        message: "User retrived successfully",
        data: result
      })

   }catch(err){
      next(err)
   }
}








export const userController = {
    createUser,
    createAdmin,
    getUserInfo
}