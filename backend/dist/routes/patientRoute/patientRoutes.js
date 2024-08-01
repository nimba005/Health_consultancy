"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const createPatient_1 = require("../../controllers/PatientController/createPatient");
const getAllPatients_1 = require("../../controllers/PatientController/getAllPatients");
const router = express_1.default.Router();
router.post("/create-patient", auth_1.generalAuthoriser, createPatient_1.createPatient);
router.get("/patients", auth_1.generalAuthoriser, getAllPatients_1.getAllPatients);
exports.default = router;