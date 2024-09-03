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
exports.deleteUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user.id;
        const user = yield User_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return response.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        yield User_1.default.destroy({ where: { id: userId } });
        return response.status(200).json({
            status: "success",
            message: "Account successfully deleted",
        });
    }
    catch (error) {
        console.error('Error deleting user:', error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});
exports.deleteUser = deleteUser;
