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
exports.getAllConsultations = void 0;
const Consultation_1 = __importDefault(require("../../models/Consultation"));
const Patient_1 = __importDefault(require("../../models/Patient"));
const getAllConsultations = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultations = yield Consultation_1.default.findAll();
        const patientIds = consultations.map(consultation => consultation.patient_id);
        const patients = yield Patient_1.default.findAll({
            where: {
                id: patientIds
            },
            attributes: ['id', 'first_name', 'last_name']
        });
        const patientMap = new Map(patients.map(patient => [patient.id, `${patient.first_name} ${patient.last_name}`]));
        const consultationsWithPatientNames = consultations.map(consultation => (Object.assign(Object.assign({}, consultation.toJSON()), { patient_name: patientMap.get(consultation.patient_id) })));
        return response.status(200).json({
            status: "success",
            message: `Found ${consultations.length} consultations`,
            consultations: consultationsWithPatientNames,
        });
    }
    catch (error) {
        console.error('Error fetching consultations:', error);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});
exports.getAllConsultations = getAllConsultations;