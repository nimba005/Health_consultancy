import { Response } from "express";
import Consultation from "../../models/Consultation";
import Patient from "../../models/Patient";
import { JwtPayload } from "jsonwebtoken";

export const getAllConsultations = async (request: JwtPayload, response: Response) => {
    try {
        const consultations = await Consultation.findAll();

        const patientIds = consultations.map(consultation => consultation.patient_id);
        const patients = await Patient.findAll({
            where: {
                id: patientIds
            },
            attributes: ['id', 'first_name', 'last_name']
        });

        const patientMap = new Map(patients.map(patient => [patient.id, `${patient.first_name} ${patient.last_name}`]));

        const consultationsWithPatientNames = consultations.map(consultation => ({
            ...consultation.toJSON(),
            patient_name: patientMap.get(consultation.patient_id)
        }));

        return response.status(200).json({
            status: "success",
            message: `Found ${consultations.length} consultations`,
            consultations: consultationsWithPatientNames,
        });
    } catch (error: any) {
        console.error('Error fetching consultations:', error);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};