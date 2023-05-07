import { Handler } from 'express'
import { ChatService } from '../Service/chat.service'

export class ChatController {
    private chatService:ChatService = new ChatService()

    getFindAllChat:Handler = async (_req,res) => {
        res.json({
            chat:(await this.chatService.getFindAllChat()).chat
        })
    }
}