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
exports.createConsultation = void 0;
const uuid_1 = require("uuid");
const Consultation_1 = __importDefault(require("../../models/Consultation"));
const createConsultation = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patient_id, consultation_date, consultation_type, consultation_summary } = request.body;
        const userId = request.user.id;
        const ConsultationId = (0, uuid_1.v4)();
        const consultation = yield Consultation_1.default.create({
            id: ConsultationId,
            officer_id: userId,
            patient_id,
            consultation_date,
            consultation_type,
            consultation_summary: consultation_summary || '',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return response.status(200).json({
            status: "success",
            message: "Consultation created successfully",
            consultation,
        });
    }
    catch (error) {
        console.error('Error creating consultation:', error);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});
exports.createConsultation = createConsultation;
