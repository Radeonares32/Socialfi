import express, { Handler } from "express";

import { NotificationController } from "../Controller/notification.controller";

import { Middlewares } from "../../../middleware/middleware";

const app = express.Router();

const notificaitonController: NotificationController = new NotificationController();

//Get
export const getNotifications: Handler = app.get(
  "/",
  Middlewares.userAuth,
  notificaitonController.getNotifications
);
export const getNotification: Handler = app.get(
  "/:id",
  Middlewares.userAuth,
  notificaitonController.getNotification
);

//Post
export const postNotification: Handler = app.post(
  "/create",
  Middlewares.userAuth,
  notificaitonController.postNotification
);

//Delete
export const deleteNotification: Handler = app.delete(
  "/delete",
  Middlewares.userAuth,
  notificaitonController.deleteNotification
);
