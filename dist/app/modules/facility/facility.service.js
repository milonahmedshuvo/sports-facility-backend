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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityService = void 0;
const apperror_1 = __importDefault(require("../../error/apperror"));
const facility_model_1 = require("./facility.model");
const createFaciltyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(payload);
    return result;
});
const updateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const remainingsData = __rest(payload, []);
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, remainingsData, { new: true });
    return result;
});
const deleteFacilityIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facility_model_1.Facility.findById(id);
    if (!facility) {
        throw new apperror_1.default(400, 'Facility not Found');
    }
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find();
    return result;
});
exports.facilityService = {
    createFaciltyIntoDB,
    updateFacilityIntoDB,
    deleteFacilityIntoDB,
    getAllFacilityFromDB
};
