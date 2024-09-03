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
exports.getAllPatients = void 0;
const Patient_1 = __importDefault(require("../../models/Patient"));
const User_1 = __importDefault(require("../../models/User"));
const getAllPatients = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user.id;
        const patients = yield Patient_1.default.findAll({ where: { officer_id: userId } });
        const user = (yield User_1.default.findOne({ where: { id: userId }, }));
        if (patients.length > 0) {
            return response.status(200).json({
                status: "success",
                message: `You currently have ${patients.length} patients`,
                user,
                patients,
            });
        }
        else if (patients.length === 0) {
            return response.status(200).json({
                status: "success",
                message: "No patient found",
                user,
                patients
            });
        }
        else {
            return response.status(400).json({
                status: "error",
                message: "please try again",
            });
        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});
exports.getAllPatients = getAllPatients;
