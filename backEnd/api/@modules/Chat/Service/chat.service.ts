import { ChatDal } from '../Dal/chat.dal'

export class ChatService {
    private chatDal:ChatDal = new ChatDal()

    async getFindAllChat() {
        return {
            chat:await this.chatDal.findAllChat()
        }
    }
    async getFindChat(chatId:string) {
        if(chatId) {
            return {
                chat:await this.chatDal.findChat(chatId)
            }
        }
        else {
            return {
                chat:"chatId not found"
            }
        }
    }
}