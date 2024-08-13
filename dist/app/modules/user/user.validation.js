"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        email: zod_1.default.string(),
        password: zod_1.default.string(),
        phone: zod_1.default.string(),
        role: zod_1.default.enum(['user', 'admin']),
        address: zod_1.default.string()
    })
});
const updateUserValidationSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().optional(),
    password: zod_1.default.string().optional(),
    phone: zod_1.default.string().optional(),
    role: zod_1.default.enum(['user', 'admin']).optional(),
    address: zod_1.default.string().optional()
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
};
