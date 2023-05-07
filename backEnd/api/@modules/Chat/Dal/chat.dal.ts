import { IChatMessage } from "../Entity/IChatMessage";
import { IChatRoom } from "../Entity/IChatRoom";
import { IUser } from "../../User/Entity/IUser";

import { ChatRepository } from "../Repository/chat.repo";
import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

export class ChatDal implements ChatRepository {
  findAllChat(): Promise<IChatRoom[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const chat: any = await neo4j()
          ?.readCypher("match (c:chat) return c", {})
          .catch((err) => console.log(err));
        const rChat: any = chat.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rChat as IChatRoom[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findChat(chatId: string): Promise<IChatRoom> {
    return new Promise(async (resolve, reject) => {
      try {
        const chat: any = await neo4j()?.readCypher(
          "match (c:chat {id:$chatId}) return c",
          { chatId }
        );
        const rChat: any = chat.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rChat as IChatRoom);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findAllMessage(): Promise<IChatMessage[]> {
    return new Promise(async (resolve, reject) => {
        const message: any = await neo4j()?.readCypher(
            "match (m:message) return m",
            {  }
          );
          const rMessage: any = message.records.map((uss: any) => {
            return uss.map((res: any) => {
              return res.properties;
            });
          });
          resolve(rMessage as IChatMessage[])
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findMessage(messageId: string): Promise<IChatMessage> {
    return new Promise(async (resolve, reject) => {
        const message: any = await neo4j()?.readCypher(
            "match (m:message {id:$messageId}) return m",
            { messageId }
          );
          const rMessage: any = message.records.map((uss: any) => {
            return uss.map((res: any) => {
              return res.properties;
            });
          });
          resolve(rMessage as IChatMessage)
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findUserChatRoom(chatId: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
        const user: any = await neo4j()?.readCypher(
            "match(c:chat {id:$chatId}) match(u:user) match(u)-[:userChatRel]->(c) return u",
            { chatId }
          );
          const rUser:any = user.records.map((uss: any) => {
            return uss.map((res: any) => {
              return res.properties;
            });
          });
          resolve(rUser as IUser);
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findChatRoomUser(walletAddr: string): Promise<IChatRoom> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findChatMessages(chatId: string): Promise<IChatMessage[]> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findChatMessageUser(
    chatId: string,
    walletAddr: string
  ): Promise<IChatMessage[]> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  createChatRoom(): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  createUserMessage(
    chatId: string,
    walletAddr: string,
    message: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}
