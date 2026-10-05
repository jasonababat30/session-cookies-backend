import express from "express";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
    console.log(`🧣 Server is running at port ${port}`);
});
