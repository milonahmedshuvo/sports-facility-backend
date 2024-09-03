import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const userLogin = async (req:Request, res:Response, next:NextFunction) => {

    try{
        const result = await authService.userLoginFromDB(req.body.data)


    res.status(200).json({
        success: true,
        message: "user login successfully",
        data: result
    })
    
    }catch(err){
        next(err)
    }
}



export const authController = {
    userLogin
}