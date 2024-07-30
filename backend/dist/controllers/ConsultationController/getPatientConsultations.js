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
exports.getPatientConsultations = void 0;
const Consultation_1 = __importDefault(require("../../models/Consultation"));
const getPatientConsultations = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: patient_id } = request.params; // Ensure it matches the route param
        const consultations = yield Consultation_1.default.findAll({ where: { patient_id } });
        if (!consultations) {
            return response.status(404).json({
                status: "error",
                message: `No consultations found for patient ${patient_id}`,
            });
        }
        return response.status(200).json({
            status: "success",
            message: `Found ${consultations.length} consultations for patient ${patient_id}`,
            consultations,
        });
    }
    catch (error) {
        console.error('Error fetching patient consultations:', error);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});
exports.getPatientConsultations = getPatientConsultations;