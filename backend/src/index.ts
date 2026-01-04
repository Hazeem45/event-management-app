import express from "express";
import router from "./routes/api";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use("/api", router);

export default app;
