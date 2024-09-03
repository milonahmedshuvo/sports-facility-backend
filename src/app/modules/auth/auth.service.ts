import config from "../../config";
import AppError from "../../error/apperror";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userLoginFromDB = async (payload:TLoginUser) => {
    

    const user = await User.findOne({email: payload.email})

    if(!user){
        throw new AppError( 404,'user not found!!')
    }


    const isPasswordMatch = await bcrypt.compare(payload.password, user.password)
    

    if(!isPasswordMatch){
        throw new AppError(400,"user password not match!!")
    }

    
    
    const jwtPayload = {
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.access_token_scret as string, {expiresIn: '30d'})




    return {
        accessToken
    }
}




export const authService = {
    userLoginFromDB
}