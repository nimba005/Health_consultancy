import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { database } from "./config";
import userRoutes from "./routes/userRoute/userRoutes";
import patientRoutes from "./routes/patientRoute/patientRoutes";
import consultantRoute from "./routes/ConsultantRoute/consultantRoute";

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent/received
  })
);

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/patient", patientRoutes);
app.use("/consultations", consultantRoute);

database
  .sync() // this will create tables if they do not exist
  .then(async () => {
    console.log("Database is connected");
  })
  .catch((err: Error) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

export default app;
