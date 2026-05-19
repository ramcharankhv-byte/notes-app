import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/notes-routes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// CORS FIX
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
