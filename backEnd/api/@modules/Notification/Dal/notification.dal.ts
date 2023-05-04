import { v4 as uuid } from "uuid";

import { INotification } from "../Entity/INotification";
import { NotificationRepository } from "../Repository/notification.repo";

import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

export class NotificationDal implements NotificationRepository {
  findAll(walletAddr: string): Promise<INotification[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const notifications: any = await neo4j()
          ?.readCypher(
            "match(n:notification) match(u:user {id:$walletAddr}) match(u)-[:notUserRel]->(n)  return n",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rNot = notifications.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rNot as INotification[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  find(id: string, walletAddr: string): Promise<INotification> {
    return new Promise(async (resolve, reject) => {
      try {
        const notification: any = await neo4j()
          ?.readCypher(
            "match(n:notificaiton {id:$id}) match(u:user {id:$walletAddr}) match(u)-[:notUserRel]->(n) return n",
            { id, walletAddr }
          )
          .catch((err) => console.log(err));
        const rNot = notification.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rNot as INotification);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  create(
    title: string,
    description: string,
    activityLink: string,
    walletAddr: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$walletAddr}) create(n:notification {id:$id,title:$title,description:$description,activityLink:$activityLink}) create(u)-[notUserRel:notUserRel]->(n)",
            {
              id: uuid(),
              title,
              description,
              activityLink,
              walletAddr,
            }
          )
          .catch((err) => console.log(err));
        resolve({ message: "success notification created" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  delete(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher("match(n:notification {id:$id}) detach delete n ", {
            id,
          })
          .catch((err) => console.log(err));
        resolve({ message: "success notification deleted" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}
