import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

export default app;
