import express from "express";
import { generalAuthoriser } from "../../middlewares/auth";
import { createConsultation } from "../../controllers/ConsultationController/createConsultation";
import { getAllConsultations } from "../../controllers/ConsultationController/getAllConsultations";
import { getPatientConsultations } from "../../controllers/ConsultationController/getPatientConsultations";

const router = express.Router();

router.post("/create-consultation", generalAuthoriser , createConsultation)
router.get("/get-all-consultations", generalAuthoriser, getAllConsultations)
router.get("/patient-consultations/:id", generalAuthoriser, getPatientConsultations)

export default router;