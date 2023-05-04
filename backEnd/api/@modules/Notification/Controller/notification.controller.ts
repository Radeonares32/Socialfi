import { Handler } from 'express'

import { NotificaitonService } from "../Service/notification.service";

export class NotificationController {
    private notificationService:NotificaitonService = new NotificaitonService()

    getNotifications:Handler = async (req,res) => {
        const  token  = req.headers['x-access-token'] as string
        res.json({
            notification:(await (this.notificationService.findAll(token))).notification
        })
    }
}