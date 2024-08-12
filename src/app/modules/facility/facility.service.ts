import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFaciltyIntoDB = async (payload:TFacility) => {

    const result = await Facility.create(payload)
    return result
}




export const facilityService = {
    createFaciltyIntoDB
}