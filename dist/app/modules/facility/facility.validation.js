"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const createFacilityValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        description: zod_1.default.string(),
        pricePerHour: zod_1.default.number(),
        location: zod_1.default.string(),
    })
});
const updateFacilityValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        pricePerHour: zod_1.default.number().optional(),
        location: zod_1.default.string().optional(),
    })
});
exports.facilityValidationSchema = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema
};
