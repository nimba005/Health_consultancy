import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Consultation from "../../models/Consultation";

export const createConsultation = async (request: JwtPayload, response: Response) => {
  try {
    const {
      patient_id,
      consultation_date,
      consultation_type,
      consultation_summary
    } = request.body;

    const userId = (request.user as JwtPayload).id;

    const ConsultationId = v4();

    const consultation = await Consultation.create({
      id: ConsultationId,
      officer_id: userId,
      patient_id,
      consultation_date,
      consultation_type,
      consultation_summary: consultation_summary || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return response.status(200).json({
      status: "success",
      message: "Consultation created successfully",
      consultation,
    });
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
  }
};