import { NextFunction, Request, Response } from "express";
import { facilityService } from "./facility.service";

const createFacilty = async (req:Request, res:Response, next:NextFunction) => {

    try{
        const result = await facilityService.createFaciltyIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Facility added successfully',
        data: result
    })

    }catch(err){
        next(err)
    }
}





const updateFacilty = async (req:Request, res:Response, next:NextFunction) => {

    try{
        const {id} = req.params
        const result = await facilityService.updateFacilityIntoDB(id, req.body)



    res.status(200).json({
        success: true,
        message: 'Facility updated successfully',
        data: result
    })

    }catch(err){
        next(err)
    }
}


export const facilityController = {
    createFacilty,
    updateFacilty
}