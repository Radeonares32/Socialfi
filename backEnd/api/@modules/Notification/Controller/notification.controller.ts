import { Handler } from "express";

import { NotificaitonService } from "../Service/notification.service";

export class NotificationController {
  private notificationService: NotificaitonService = new NotificaitonService();

  getNotifications: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      notification: (await this.notificationService.findAll(token))
        .notification,
    });
  };
  getNotification: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { id } = req.params;
    res.json({
      notification: (await this.notificationService.find(id, token))
        .notification,
    });
  };
  postNotification: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { title, description, activityLink } = req.body;
    res.json({
      notification: (
        await this.notificationService.create(
          title,
          description,
          activityLink,
          token
        )
      ).notification,
    });
  };
  deleteNotification: Handler = async (req, res) => {
    const { id } = req.body;
    res.json({
      notification: (await this.notificationService.delete(id)).notification,
    });
  };
}
