import express,{Handler} from 'express'

import {NotificationController } from '../Controller/notification.controller'

const app = express.Router()

const notificaitonController:NotificationController = new NotificationController()


//Get
export const getNotifications:Handler = app.get('/',notificaitonController.getNotifications)