import { Response } from "express";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import Patient, {PatientAttributes} from "../../models/Patient";
import User from "../../models/User";

export const createPatient = async (request: JwtPayload, response: Response) => {
  try {
    const {
        first_name,
        last_name,
        email,
        phone_number,
    } = request.body;

    const userId = (request.user as JwtPayload).id;
    console.log(userId);

    const PatientId = v4();

    const patientExist = (await Patient.findOne({ where: { first_name, last_name, officer_id: userId }, }))
    if (patientExist) {
      return response.status(200).json({
        status: `error`,
        message: `${first_name} ${last_name} already exist, use a different name`,
      });
    }

    await Patient.create({
      id: PatientId,
      officer_id: userId,
      first_name,
      last_name,
      email: email || '',
      phone_number: phone_number || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const findPatient = (await Patient.findOne({
      where: { first_name, last_name },
    })) as unknown as PatientAttributes;
    if (!findPatient) {
      return response.status(400).json({
        status: `error`,
        message: `Patient not created, try again`,
      });
    }
    return response.status(200).json({
      status: `success`,
      message: `Patient successfully created`,
      findPatient,
    });
  } catch (error: any) {
    if(error.message === 'jwt expired'){
      return response.status(500).json({
        status: `error`,
        navigate: true,
      });
    }
    return response.status(500).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};