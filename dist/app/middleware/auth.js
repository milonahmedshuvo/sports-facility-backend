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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apperror_1 = __importDefault(require("../error/apperror"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...requistUserRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new apperror_1.default(400, 'Authentication token is unvalid!!');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token_scret);
        const { role } = decoded;
        // check role such user and admin 
        //  const role = (decoded as JwtPayload).role 
        //   const role = decoded.role 
        if (requistUserRole && !requistUserRole.includes(role)) {
            throw new apperror_1.default(401, 'You have no access to this route');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
