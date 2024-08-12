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



export const facilityService = {
    createFaciltyIntoDB,
    updateFacilityIntoDB
}