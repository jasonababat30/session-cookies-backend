import { Request, Response } from "express";
import { ErrorExtended, LoginDTO } from "@/utils/types";
import UsersModel from "@/models/Users";

export const login = (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as LoginDTO;

        const user = UsersModel.search({
            filters: {
                username: {
                    value: username,
                    operator: "eq"
                },
            }
        })[0];

        if (!user) {
            throw {
                statusCode: 404,
                message: "User not found"
            };
        }

        const isPasswordValid = user.password === password;

        if (!isPasswordValid) {
            throw {
                statusCode: 401,
                message: "Invalid password"
            };
        }

        console.log("🌴 Login controller accessed: ", req.body);

        const { username: userNameOfUser, password: userPassword, ...restOfUserData } = user;

        req.session.user = restOfUserData;

        res.send({
            message: "✅ Login successful",
            data: restOfUserData
        });
        
    } catch (error) {
        const err = error as ErrorExtended;
        console.error("❌ Error @ login controller: ", error);
        res
            .status(err.statusCode || 500)
            .send({
                message: err.message || "Internal Server Error",
                error: err
            })
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                throw {
                    error,
                    message: "Could not logout. Please try again"
                }
            }
        });

        res.clearCookie('connect.sid');

        console.log("🌴 Logout successful");

        res.send({
            message: "✅ Logout successful"
        });
    } catch (error) {
        const err = error as ErrorExtended;
        console.error("❌ Error @ logout controller: ", error);
        res
            .status(err.statusCode || 500)
            .send({
                message: err.message || "Internal Server Error",
                error: err
            })
    }
}

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
