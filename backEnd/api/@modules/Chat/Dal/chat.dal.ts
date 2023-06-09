import { IChatMessage } from "../Entity/IChatMessage";
import { IChatRoom } from "../Entity/IChatRoom";
import { IUser } from "../../User/Entity/IUser";

import { ChatRepository } from "../Repository/chat.repo";
import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

import { v4 as uuid } from "uuid";

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
        const chat: any = await neo4j()
          ?.readCypher("match (c:chat {id:$chatId}) return c", { chatId })
          .catch((err) => console.log(err));
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
      const message: any = await neo4j()
        ?.readCypher("match (m:message) return m", {})
        .catch((err) => console.log(err));
      const rMessage: any = message.records.map((uss: any) => {
        return uss.map((res: any) => {
          return res.properties;
        });
      });
      resolve(rMessage as IChatMessage[]);
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findMessage(messageId: string): Promise<IChatMessage> {
    return new Promise(async (resolve, reject) => {
      const message: any = await neo4j()
        ?.readCypher("match (m:message {id:$messageId}) return m", {
          messageId,
        })
        .catch((err) => console.log(err));
      const rMessage: any = message.records.map((uss: any) => {
        return uss.map((res: any) => {
          return res.properties;
        });
      });
      resolve(rMessage as IChatMessage);
      try {
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findUserChatRoom(chatId: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      const user: any = await neo4j()
        ?.readCypher(
          "match(c:chat {id:$chatId}) match(u:user) match(u)-[:userChatRel]->(c) return u",
          { chatId }
        )
        .catch((err) => console.log(err));
      const rUser: any = user.records.map((uss: any) => {
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
        const chat: any = await neo4j()
          ?.readCypher(
            "match(u:user {id:$walletAddr}) match(c:chat) match(u)-[:userChatRel]->(c) return c",
            { walletAddr }
          )
          .catch((err) => console.log(err));
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
  findChatMessages(chatId: string): Promise<IChatMessage[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const message: any = await neo4j()
          ?.readCypher(
            "match(c:chat {id:$chatId}) match(m:message) match(m)-[:chatMessageRel]->(c) return m",
            { chatId }
          )
          .catch((err) => console.log(err));
        const rMessage: any = message.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rMessage as IChatMessage[]);
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
        const message: any = await neo4j()
          ?.readCypher(
            "match(c:chat {id:$chatId}) match(m:message) match(u:user {id:$walletAddr}) match(u)-[:userChatRel]->(c)-[:messageChatRel]->(m)<-[:userMessageRel]-(u) return m",
            { chatId, walletAddr }
          )
          .catch((err) => console.log(err));
        const rMessage: any = message.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rMessage as IChatMessage[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findUserMessage(walletAddr: string): Promise<IChatMessage[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const message: any = await neo4j()
          ?.readCypher(
            "match(u:user {id:$walletAddr}) match(m:message) match(u)-[:userMessageRel]->(m) return m",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rMessage: any = message.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rMessage as IChatMessage[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findMessageUser(messageId: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await neo4j()
          ?.readCypher(
            "match(m:message{id:$messageId}) match(u:user) match(m)-[:messageUserRel]->(u) return u",
            { messageId }
          )
          .catch((err) => console.log(err));
        const rUser: any = user.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rUser as IUser);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  private isRoom(walletAddr: string, otherWalletAddr: string): Promise<Number> {
    return new Promise(async (resolve, reject) => {
      try {
        const isRoom: any = await neo4j()
          ?.readCypher(
            "match(c:chat) match(u1:user {id:$walletAddr}) match(u2:user {id:$otherWalletAddr}) match(u1)-[isChat:userChatRel]->(c)<-[:userChatRel]-(u2) return count(isChat)",
            { walletAddr, otherWalletAddr }
          )
          .catch((err) => console.log(err));
        const rIsRoom: any = isRoom?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rIsRoom[0][0].low as Number);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  userRoom(walletAddr: string, otherWalletAddr: string): Promise<IChatRoom> {
    return new Promise(async (resolve, reject) => {
      try {
        const isRoom: any = await neo4j()
          ?.readCypher(
            "match(c:chat) match(u1:user {id:$walletAddr}) match(u2:user {id:$otherWalletAddr}) match(u1)-[isChat:userChatRel]->(c)<-[:userChatRel]-(u2) return c",
            { walletAddr, otherWalletAddr }
          )
          .catch((err) => console.log(err));
        const rIsRoom: any = isRoom?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rIsRoom as IChatRoom);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  createChatRoom(
    walletAddr: string,
    otherWalletAddr: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const isRoom = await this.isRoom(walletAddr, otherWalletAddr);
        if (isRoom == 1) {
          resolve({ message: "already chat room" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match(u1:user {id:$walletAddr}) match(u2:user {id:$otherWalletAddr}) create(c:chat {id:$id}) create(u1)-[:userChatRel]->(c) create(u2)-[:userChatRel]->(c)",
              { walletAddr, otherWalletAddr, id: uuid() }
            )
            .catch((err) => console.log(err));
          resolve({ message: "success chat room" });
        }
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
        await neo4j()?.writeCypher(
          "match(c:chat{id:$chatId}) match(u:user{id:$walletAddr}) create(m:message{id:$id,message:$message}) create(m)-[:messageUserRel]->(u) create(u)-[:userMessageRel]->(m) create(m)-[:chatMessageRel]->(c) create(c)-[:messageChatRel]->(m)",
          { chatId, walletAddr, message, id: uuid() }
        );
        resolve({ message: "success message" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}
