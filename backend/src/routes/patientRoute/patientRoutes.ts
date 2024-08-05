import express from "express";
import { generalAuthoriser } from "../../middlewares/auth";
import { createPatient } from "../../controllers/PatientController/createPatient";
import { getAllPatients } from "../../controllers/PatientController/getAllPatients";

const router = express.Router();

router.post("/create-patient", generalAuthoriser , createPatient)
router.get("/patients", generalAuthoriser, getAllPatients)

export default router;