import { Request, Response } from 'express';
import { ErrorExtended } from "@/utils/types";

export const getCurrentUser = (req: Request, res: Response) => {
    try {
        const user = req.session.user;

        if (!user) {
            throw {
                statusCode: 401,
                message: "Unauthorized",
                user
            }
        }

        res.send({
            message: "✅ Get Current User successful",
            data: user
        })
    } catch (error) {
        const err = error as ErrorExtended;
        console.error("❌ Error @ getCurrentUser controller: ", error);
        res
            .status(err.statusCode || 500)
            .send({
                message: err.message || "Internal Server Error",
                error: err
            });
    }
}
