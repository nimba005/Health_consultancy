import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express'
import Patient from "../../models/Patient";
import User, { UserAttributes } from "../../models/User";

export const getAllPatients = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        const patients = await Patient.findAll({ where: { officer_id: userId } })

        const user = (await User.findOne({ where: { id: userId }, })) as unknown as UserAttributes;

        if (patients.length > 0) {
            return response.status(200).json({
                status: "success",
                message: `You currently have ${patients.length} patients`,
                user,
                patients,
            })
        } else if (patients.length === 0) {
            return response.status(200).json({
                status: "success",
                message: "No patient found",
                user,
                patients
            })
        } else {
            return response.status(400).json({
                status: "error",
                message: "please try again",
            })
        }

    } catch (error: any) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}