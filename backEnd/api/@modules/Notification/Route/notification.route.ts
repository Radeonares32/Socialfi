import express,{Handler} from 'express'

import {NotificationController } from '../Controller/notification.controller'

import { Middlewares } from '../../../middleware/middleware'

const app = express.Router()

const notificaitonController:NotificationController = new NotificationController()


//Get
export const getNotifications:Handler = app.get('/',Middlewares.userAuth,notificaitonController.getNotifications)