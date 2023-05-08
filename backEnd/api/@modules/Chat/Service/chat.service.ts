import { Server } from "socket.io";

import { security } from "../../../security/security";
import { ChatDal } from "../Dal/chat.dal";
import { server } from "../../../../server";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
export class ChatService {
  private chatDal: ChatDal = new ChatDal();

  async getFindAllChat() {
    return {
      chat: await this.chatDal.findAllChat(),
    };
  }
  async getFindChat(chatId: string) {
    if (chatId) {
      return {
        chat: await this.chatDal.findChat(chatId),
      };
    } else {
      return {
        chat: "chatId not found",
      };
    }
  }
  async getFindAllMessage() {
    return {
      chat: await this.chatDal.findAllMessage(),
    };
  }
  async getFindMessage(messageId: string) {
    if (messageId) {
      return {
        chat: await this.chatDal.findMessage(messageId),
      };
    } else {
      return {
        chat: "chatId not found",
      };
    }
  }
  async getFindUserChatRoom(chatId: string) {
    if (chatId) {
      return {
        chat: await this.chatDal.findUserChatRoom(chatId),
      };
    } else {
      return {
        chat: "chatId not found",
      };
    }
  }
  async getFindChatRoomUser(token: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token).token
      ?.payload?.walletAddr as string;
    return {
      chat: await this.chatDal.findChatRoomUser(verifyWalletAddr),
    };
  }
  async getFindChatMessages(chatId: string) {
    if (chatId) {
      return {
        chat: await this.chatDal.findChatMessages(chatId),
      };
    } else {
      return {
        chat: "chatId not found",
      };
    }
  }
  async getFindChatMessageUser(chatId: string, token: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token).token
      ?.payload?.walletAddr as string;
    if (chatId && token) {
      return {
        chat: await this.chatDal.findChatMessageUser(chatId, verifyWalletAddr),
      };
    } else {
      return {
        chat: "chatId or token not found",
      };
    }
  }
  async getFindUserMessage(token: string) {
    if (token) {
      const verifyWalletAddr = security.jwt.token.verifyToken(token).token
        ?.payload?.walletAddr as string;
      return {
        chat: await this.chatDal.findUserMessage(verifyWalletAddr),
      };
    } else {
      return {
        chat: "token not found",
      };
    }
  }
  async getFindMessageUser(messageId: string) {
    if (messageId) {
      return {
        chat: await this.chatDal.findMessageUser(messageId),
      };
    } else {
      return {
        chat: "messageId not found",
      };
    }
  }
  async getUserRoom(token: string, otherWalletAddr: string) {
    if (token && otherWalletAddr) {
      const verifyWalletAddr = security.jwt.token.verifyToken(token).token
        ?.payload?.walletAddr as string;
      return {
        chat: await this.chatDal.userRoom(verifyWalletAddr, otherWalletAddr),
      };
    } else {
      return {
        chat: "token or otherWalletAddr not found",
      };
    }
  }
  async postCreateChatRoom(token: string, otherWalletAddr: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token).token
      ?.payload?.walletAddr as string;
    if (token && otherWalletAddr) {
      return {
        chat: await this.chatDal.createChatRoom(
          verifyWalletAddr,
          otherWalletAddr
        ),
      };
    } else {
      return {
        chat: "token or otherWalletAddr not found",
      };
    }
  }
  async postCreateUserMessage(chatId: string, token: string, message: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token).token
      ?.payload?.walletAddr as string;
    if (token && chatId && message) {
      io.on("connection", (socket) => {
        socket.on(chatId, (data: any, cb: any) => {
          io.emit(chatId, data);
        });
      });
      return {
        chat: await this.chatDal.createUserMessage(
          chatId,
          verifyWalletAddr,
          message
        ),
      };
    } else {
      return {
        chat: "token or chatId or message not found",
      };
    }
  }
}
