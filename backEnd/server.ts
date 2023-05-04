import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);

import { userRoutes } from "./api/@modules/User/Route/routes";
import { notificaitonRoutes } from './api/@modules/Notification/Route/routes'

app.use("/", userRoutes,notificaitonRoutes);

server.listen(3000, () => {
  console.log("server running");
});
