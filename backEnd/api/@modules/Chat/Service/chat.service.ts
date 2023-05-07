import { ChatDal } from '../Dal/chat.dal'

export class ChatService {
    private chatDal:ChatDal = new ChatDal()

    async getFindAllChat() {
        return {
            chat:await this.chatDal.findAllChat()
        }
    }
}