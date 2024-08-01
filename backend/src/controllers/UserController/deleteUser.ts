import { JwtPayload } from "jsonwebtoken";
import { Response } from 'express';
import User from "../../models/User";

export const deleteUser = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return response.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        await User.destroy({ where: { id: userId } });

        return response.status(200).json({
            status: "success",
            message: "Account successfully deleted",
        });

    } catch (error: any) {
        console.error('Error deleting user:', error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
}