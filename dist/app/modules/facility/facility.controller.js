"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityController = void 0;
const facility_service_1 = require("./facility.service");
const createFacilty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield facility_service_1.facilityService.createFaciltyIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: 'Facility added successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const updateFacilty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield facility_service_1.facilityService.updateFacilityIntoDB(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Facility updated successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteFacilty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield facility_service_1.facilityService.deleteFacilityIntoDB(id);
        res.status(200).json({
            success: true,
            message: 'Facility deleted successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllFacilty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield facility_service_1.facilityService.getAllFacilityFromDB();
        //   not data found 
        if (result.length === 0) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No Data Found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: 'Facilities retrieved successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
exports.facilityController = {
    createFacilty,
    updateFacilty,
    deleteFacilty,
    getAllFacilty
};
