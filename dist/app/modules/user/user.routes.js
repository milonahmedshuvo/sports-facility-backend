"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validationRequist_1 = __importDefault(require("../../middleware/validationRequist"));
const router = express_1.default.Router();
router.post('/create', (0, validationRequist_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.userController.createUser);
exports.userRoutes = router;
