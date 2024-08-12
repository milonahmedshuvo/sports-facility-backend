import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const studentSchema = new Schema<TUser> ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
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





// creating model 
export const User = model<TUser>('User', studentSchema)

