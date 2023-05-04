import express, { Handler } from "express";
const app = express.Router();

import { getNotifications } from "./notification.route";

export const notificaitonRoutes: Handler = app.use(
  "/notification",
  getNotifications
);
