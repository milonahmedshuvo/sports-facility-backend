import AppError from "../../error/apperror";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFaciltyIntoDB = async (payload:TFacility) => {

    const result = await Facility.create(payload)
    return result
}



const updateFacilityIntoDB = async (id:string, payload:Partial<TFacility>) => {
    const {...remainingsData} = payload

    const result = await Facility.findByIdAndUpdate(id, remainingsData, {new: true})
    return result
}




const deleteFacilityIntoDB = async (id:string) => {

    const facility = await Facility.findById(id)
    console.log(facility)

    if(!facility){
        throw new AppError(400,'Facility not Found')
    }
    
    const result = await Facility.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    return result
}






const getAllFacilityFromDB = async ( ) => {

    const result = await Facility.find()
    return result
}



const getSingleFacilityFromDB = async ( id:string ) => {

    const result = await Facility.findById(id)
    return result
}

export const facilityService = {
    createFaciltyIntoDB,
    updateFacilityIntoDB,
    deleteFacilityIntoDB,
    getAllFacilityFromDB,
    getSingleFacilityFromDB
}