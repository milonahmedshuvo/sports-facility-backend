import { model, Schema } from "mongoose";
import { TFacility } from "./facility.interface";


const facilitySchema = new Schema<TFacility>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})



// creating model 
export const Facility = model('Facility', facilitySchema)

