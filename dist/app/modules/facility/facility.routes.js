"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const facility_constant_1 = require("./facility.constant");
const validationRequist_1 = __importDefault(require("../../middleware/validationRequist"));
const facility_validation_1 = require("./facility.validation");
const router = express_1.default.Router();
router.post('/create', (0, validationRequist_1.default)(facility_validation_1.facilityValidationSchema.createFacilityValidationSchema), (0, auth_1.default)(facility_constant_1.user_role.admin), facility_controller_1.facilityController.createFacilty);
router.put('/update/:id', (0, validationRequist_1.default)(facility_validation_1.facilityValidationSchema.updateFacilityValidationSchema), (0, auth_1.default)(facility_constant_1.user_role.admin), facility_controller_1.facilityController.updateFacilty);
router.delete('/delete/:id', (0, auth_1.default)(facility_constant_1.user_role.admin), facility_controller_1.facilityController.deleteFacilty);
router.get('/all', facility_controller_1.facilityController.getAllFacilty);
exports.facilityRoutes = router;
