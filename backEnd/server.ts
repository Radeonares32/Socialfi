import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const app = express();
export const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);
app.use("/public", express.static(path.join(__dirname, "../public")));

import { userRoutes } from "./api/@modules/User/Route/routes";
import { notificaitonRoutes } from "./api/@modules/Notification/Route/routes";
import { postRoutes } from "./api/@modules/Post/Route/routes";
import { chatRoutes } from "./api/@modules/Chat/Route/routes";

app.use("/", userRoutes, notificaitonRoutes, postRoutes, chatRoutes);

server.listen(3000, () => {
  console.log("server running");
});
