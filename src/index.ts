import express from "express";
import cors from "cors";
import session from 'express-session';
import "@/utils/verify-env-vars";
import "dotenv/config";
import authRouter from "@/routes/auth";
import userRouter from "@/routes/user";
import isUserLoggedIn from '@/middlewares/isUserLoggedIn';

const app = express();
const port = process.env.PORT;

// MIDDLEWARES
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors({
    origin: process.env.WEB_URL!,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
}))

app.get("/", (req, res) => {
    res.send("Hello World SESSION COOKIES BACKEND");
});

app.get("/data", (req, res) => {
    console.log("🌴 Data route accessed");
    res.send({
        message: "Hello Data"
    });
})

// ROUTES
app.use("/auth", authRouter);
app.use("/user", isUserLoggedIn, userRouter);

app.listen(port, () => {
    console.log(`🧣 Server is running at port ${port}`);
});
