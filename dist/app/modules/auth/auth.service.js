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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const apperror_1 = __importDefault(require("../../error/apperror"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userLoginFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new apperror_1.default(404, 'user not found!!');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new apperror_1.default(400, "user password not match!!");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_scret, { expiresIn: '30d' });
    return {
        accessToken
    };
});
exports.authService = {
    userLoginFromDB
};
