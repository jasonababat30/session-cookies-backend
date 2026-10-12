import express from "express";
import cors from "cors";
import authRouter from "@/routes/auth";
import session from 'express-session';
import "dotenv/config";

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

app.listen(port, () => {
    console.log(`🧣 Server is running at port ${port}`);
});
