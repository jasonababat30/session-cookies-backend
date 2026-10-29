import express from "express";
import { login, logout, getCurrentUser } from "@/controllers/auth";
import isUserLoggedIn from "@/middlewares/isUserLoggedIn";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", isUserLoggedIn, getCurrentUser);

export default authRouter;
