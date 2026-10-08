require("dotenv").config();

import express from "express";
import cors from "cors";
import authRouter from "@/routes/auth";

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

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
