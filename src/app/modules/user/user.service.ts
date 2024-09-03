import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import  jwt, { JwtPayload }  from "jsonwebtoken";

const createUserIntoDB = async (payload:TUser) =>{

 
    
     if(payload.role !== "admin"){
        payload.role = 'user'
     }
       


    const result = await User.create(payload)

    const jwtPayload = {
        email: result.email,
        role: result.role
    }
    const accessToken = jwt.sign(jwtPayload, config.access_token_scret as string, {expiresIn: '30d'})

    return {accessToken, result}
}




const createAdminIntoDB = async (payload:TUser) =>{

  
    
    payload.role = 'admin'
      


   const result = await User.create(payload)

//    console.log( "usercreate:", result)
   const jwtPayload = {
       email: result.email,
       role: result.role
   }
   const accessToken = jwt.sign(jwtPayload, config.access_token_scret as string, {expiresIn: '30d'})

   return {accessToken, result}
}









const getUserInformationFromDB = async (payload: JwtPayload) => {
    // console.log('user info from database', payload)
    
    const user = await User.findOne({email:payload.email, role: payload.role})
    return user
}



export const userService = {
    createUserIntoDB,
    getUserInformationFromDB,
    createAdminIntoDB
}