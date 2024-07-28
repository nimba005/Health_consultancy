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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const userRoutes_1 = __importDefault(require("./routes/userRoute/userRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoute/patientRoutes"));
const consultantRoute_1 = __importDefault(require("./routes/ConsultantRoute/consultantRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/users", userRoutes_1.default);
app.use("/patient", patientRoutes_1.default);
app.use("/consultations", consultantRoute_1.default);
config_1.database
    .sync()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database is connected");
}))
    .catch((err) => {
    console.log(err);
});
app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
});
exports.default = app;