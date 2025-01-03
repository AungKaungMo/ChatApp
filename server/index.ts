import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./src/routes";
import path from "path";
import socketSetup from "./socket";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;
const databaseURL = process.env.MONGO_URI || "";
app.use("/api/uploads/files", express.static(path.resolve("uploads/files")));
app.use(
  "/api/uploads/profiles",
  express.static(path.resolve("uploads/profiles"))
);
app.use(
  cors({
    origin: [process.env.ORIGIN || "*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

const server = http.createServer(app);
socketSetup(server);

// app.use("/uploads", express.static("/uploads"));

server.listen(port, () => console.log("SERVER IS RUNNING ON " + port));

// const server = app.listen(port, () => {
//   console.log("server is running on " + port);
// });

mongoose
  .connect(databaseURL)
  .then(() => console.log("mongo db connected..."))
  .catch((err) => console.log("mongo connection failed" + err));
