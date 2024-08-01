import { Response } from "express";
import Consultation from "../../models/Consultation";
import { JwtPayload } from "jsonwebtoken";

export const getPatientConsultations = async (request: JwtPayload, response: Response) => {
    try {
        const { id: patient_id } = request.params; // Ensure it matches the route param

        const consultations = await Consultation.findAll({ where: { patient_id } });

        if (!consultations) {
            return response.status(404).json({
                status: "error",
                message: `No consultations found for patient ${patient_id}`,
            });
        }

        return response.status(200).json({
            status: "success",
            message: `Found ${consultations.length} consultations for patient ${patient_id}`,
            consultations,
        });
    } catch (error: any) {
        console.error('Error fetching patient consultations:', error);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};