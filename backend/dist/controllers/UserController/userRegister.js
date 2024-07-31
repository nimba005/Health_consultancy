"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_1 = __importStar(require("../../models/User"));
const uuid_1 = require("uuid");
const helpers_1 = require("../../helpers/helpers");
const registerUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, user_name, email, phone_number, password, confirm_password, } = request.body;
        if (!email) {
            return response.status(400).json({
                status: 'error',
                message: 'Email is required',
            });
        }
        const checkUserEmail = yield User_1.default.findOne({ where: { email } });
        if (checkUserEmail) {
            return response.status(400).json({
                status: `error`,
                message: `${email} is already in use`,
            });
        }
        if (password !== confirm_password) {
            return response.status(400).json({
                status: `error`,
                message: `Password mismatch`,
            });
        }
        const userId = (0, uuid_1.v4)();
        const passwordHash = yield (0, helpers_1.hashPassword)(password);
        const newUser = yield User_1.default.create({
            id: userId,
            first_name,
            last_name,
            user_name,
            email,
            phone_number,
            password: passwordHash,
            role: User_1.role.USER,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const findUser = (yield User_1.default.findOne({
            where: { email },
        }));
        if (!findUser) {
            return response.status(400).json({
                status: `error`,
                message: `User not registered, contact admin`,
            });
        }
        return response.status(201).json({
            status: 'success',
            data: newUser,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            method: request.method,
            message: error.message,
        });
    }
});
exports.registerUser = registerUser;