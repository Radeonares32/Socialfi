import { INotification } from "../Entity/INotification";
import { NotificationRepository } from "../Repository/notification.repo";

import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

export class INotificationDal implements NotificationRepository {
  findAll(): Promise<INotification[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const notifications: any = await neo4j()
          ?.readCypher("match(n:notification) return n", {})
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
  find(id: string): Promise<INotification> {
    return new Promise(async (resolve, reject) => {
      try {
        const notification: any = await neo4j()
          ?.readCypher("match(n:notificaiton {id:$id}) return n", { id })
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
    id: string,
    title: string,
    description: string,
    activityLink: string,
    walletAddr: string
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
}
