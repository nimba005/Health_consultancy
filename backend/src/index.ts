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
    origin: (origin, callback) => {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow cookies to be sent/received
  })
);

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userRoutes);
app.use("/patient", patientRoutes);
app.use("/consultations", consultantRoute);

// Database synchronization
database
  .sync() // this will create tables if they do not exist
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: Error) => {
    console.error("Database connection error:", err);
  });

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;