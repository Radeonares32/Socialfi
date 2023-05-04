import { Handler } from 'express'

import { NotificaitonService } from "../Service/notification.service";

export class NotificationController {
    private notificationService:NotificaitonService = new NotificaitonService()

    getNotifications:Handler = async (req,res) => {
        const  token:any  = req.headers['x-access-token']
        res.json({
            notification:(await (this.notificationService.findAll(token))).notification
        })
    }
}