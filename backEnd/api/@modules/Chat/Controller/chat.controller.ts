import { Handler } from "express";
import { ChatService } from "../Service/chat.service";

export class ChatController {
  private chatService: ChatService = new ChatService();

  getFindAllChat: Handler = async (_req, res) => {
    res.json({
      chat: (await this.chatService.getFindAllChat()).chat,
    });
  };
  getFindChat: Handler = async (req, res) => {
    const { chatId } = req.body;
    res.json({
      chat: (await this.chatService.getFindChat(chatId)).chat,
    });
  };
  getFindAllMessage: Handler = async (_req, res) => {
    res.json({
      chat: (await this.chatService.getFindAllMessage()).chat,
    });
  };
  getFindMessage: Handler = async (req, res) => {
    const { messageId } = req.body;
    res.json({
      chat: (await this.chatService.getFindMessage(messageId)).chat,
    });
  };
  getFindUserChatRoom: Handler = async (req, res) => {
    const { chatId } = req.body;
    res.json({
      chat: (await this.chatService.getFindUserChatRoom(chatId)).chat,
    });
  };
  getFindChatRoomUser: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      chat: (await this.chatService.getFindChatRoomUser(token)).chat,
    });
  };
  getFindChatMessages: Handler = async (req, res) => {
    const { chatId } = req.body;
    res.json({
      chat: (await this.chatService.getFindChatMessages(chatId)).chat,
    });
  };
  getFindChatMessageUser: Handler = async (req, res) => {
    const { chatId } = req.body;
    const token = req.headers["x-access-token"] as string;
    res.json({
      chat: (await this.chatService.getFindChatMessageUser(chatId,token)).chat,
    });
  };
  getFindUserMessage: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      chat: (await this.chatService.getFindUserMessage(token)).chat,
    });
  };
}
