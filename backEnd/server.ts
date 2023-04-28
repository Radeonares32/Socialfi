import express from "express";
import http from "http";
import bodyParser from "body-parser";
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

import { userRoutes } from "./api/@modules/User/Route/routes";

app.use("/", userRoutes);

server.listen(3000);
