import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/notes-routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://notes-app-dun-seven.vercel.app"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/notes", noteRouter);

export default app;
