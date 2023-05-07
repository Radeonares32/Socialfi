import { IChatMessage } from "../Entity/IChatMessage";
import { IChatRoom } from "../Entity/IChatRoom";
import { IUser } from "../../User/Entity/IUser";

export interface ChatRepository {
  findAllChat(): Promise<IChatRoom[]>;
  findChat(chatId: string): Promise<IChatRoom>;
  findAllMessage(): Promise<IChatMessage[]>;
  findMessage(messageId: string): Promise<IChatMessage>;
  findUserChatRoom(chatId: string): Promise<IUser>;
  findChatRoomUser(walletAddr: string): Promise<IChatRoom>;
  findChatMessages(chatId: string): Promise<IChatMessage[]>;
  findChatMessageUser(
    chatId: string,
    walletAddr: string
  ): Promise<IChatMessage[]>;
  findUserMessage(walletAddr:string):Promise<IChatMessage[]>
  findMessageUser(messageId:string):Promise<IUser>
  createChatRoom(walletAddr:string,otherWalletAddr:string): Promise<{ message: string }>;
  createUserMessage(
    chatId: string,
    walletAddr: string,
    message: string
  ): Promise<{ message: string }>;
}
