import { Handler } from 'express'
import { ChatService } from '../Service/chat.service'

export class ChatController {
    private chatService:ChatService = new ChatService()

    getFindAllChat:Handler = async (_req,res) => {
        res.json({
            chat:(await this.chatService.getFindAllChat()).chat
        })
    }
    getFindChat:Handler = async (req,res) => {
        const { chatId } = req.body
        res.json({
            chat:(await this.chatService.getFindChat(chatId)).chat
        })
    }
}