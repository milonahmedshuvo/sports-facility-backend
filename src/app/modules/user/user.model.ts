import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'


const userSchema = new Schema<TUser> ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: [true, 'you must be role required']
    },
    address: {
        type: String,
        required: true
    }
})


// use pre hook and middleware before save document in the database
userSchema.pre('save', async function (next) {
    console.log(this.password)

    this.password = await bcrypt.hash(this.password, 16)
    next()
})





// creating model 
export const User = model<TUser>('User', userSchema)



