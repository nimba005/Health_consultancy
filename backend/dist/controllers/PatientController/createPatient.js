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
exports.createPatient = void 0;
const uuid_1 = require("uuid");
const Patient_1 = __importDefault(require("../../models/Patient"));
const createPatient = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, phone_number, } = request.body;
        const userId = request.user.id;
        console.log(userId);
        const PatientId = (0, uuid_1.v4)();
        const patientExist = (yield Patient_1.default.findOne({ where: { first_name, last_name, officer_id: userId }, }));
        if (patientExist) {
            return response.status(200).json({
                status: `error`,
                message: `${first_name} ${last_name} already exist, use a different name`,
            });
        }
        yield Patient_1.default.create({
            id: PatientId,
            officer_id: userId,
            first_name,
            last_name,
            email: email || '',
            phone_number: phone_number || '',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const findPatient = (yield Patient_1.default.findOne({
            where: { first_name, last_name },
        }));
        if (!findPatient) {
            return response.status(400).json({
                status: `error`,
                message: `Patient not created, try again`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Patient successfully created`,
            findPatient,
        });
    }
    catch (error) {
        if (error.message === 'jwt expired') {
            return response.status(500).json({
                status: `error`,
                navigate: true,
            });
        }
        return response.status(500).json({
            status: `error`,
            method: request.method,
            message: error.message,
        });
    }
});
exports.createPatient = createPatient;
