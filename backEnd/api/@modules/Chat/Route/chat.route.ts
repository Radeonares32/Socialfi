import express,{Handler} from 'express'

import { ChatController } from '../Controller/chat.controller'
import { Middlewares } from '../../../middleware/middleware'

const app = express.Router()
const chatController:ChatController = new ChatController()


//Get
export const  getFindAllChatRoute:Handler = app.get('/findAllChat',Middlewares.userAuth,chatController.getFindAllChat)
export const getFindAllMessageRoute:Handler = app.get('/findAllMessage',Middlewares.userAuth,chatController.getFindAllMessage)
export const getFindUserMessageRoute:Handler = app.get('/findUserMessage',Middlewares.userAuth,chatController.getFindUserMessage)


//Post
export const postCreateChatRoomRoute:Handler = app.post('/createChatRoom',Middlewares.userAuth,chatController.postCreateChatRoom)
export const postCreateUserMessageRoute:Handler = app.post('/createUserMessage',Middlewares.userAuth,chatController.postCreateUserMessage)
export const getFindChatRoute:Handler = app.post('/findChat',Middlewares.userAuth,chatController.getFindChat)
export const getFindMessageRoute:Handler = app.post('/findMessage',Middlewares.userAuth,chatController.getFindMessage)
export const getFindUserChatRoomRoute:Handler = app.post('/findUserChatRoom',Middlewares.userAuth,chatController.getFindUserChatRoom)
export const getFindChatRoomUserRoute:Handler = app.post('/findChatRoomUser',Middlewares.userAuth,chatController.getFindChatRoomUser)
export const getFindChatMessagesRoute:Handler = app.post('/findChatMessages',Middlewares.userAuth,chatController.getFindChatMessages)
export const getFindChatMessageUserRoute:Handler = app.post('/findChatMessageUser',Middlewares.userAuth,chatController.getFindChatMessageUser)
export const getFindMessageUserRoute:Handler = app.post('/findMessageUser',Middlewares.userAuth,chatController.getFindMessageUser)

