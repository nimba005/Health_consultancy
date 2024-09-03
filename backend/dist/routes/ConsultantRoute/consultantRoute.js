"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const createConsultation_1 = require("../../controllers/ConsultationController/createConsultation");
const getAllConsultations_1 = require("../../controllers/ConsultationController/getAllConsultations");
const getPatientConsultations_1 = require("../../controllers/ConsultationController/getPatientConsultations");
const router = express_1.default.Router();
router.post("/create-consultation", auth_1.generalAuthoriser, createConsultation_1.createConsultation);
router.get("/get-all-consultations", auth_1.generalAuthoriser, getAllConsultations_1.getAllConsultations);
router.get("/patient-consultations/:id", auth_1.generalAuthoriser, getPatientConsultations_1.getPatientConsultations);
exports.default = router;
