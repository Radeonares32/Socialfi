import { INotification } from "../Entity/INotification";
import { NotificationRepository } from "../Repository/notification.repo";

export class INotificationDal implements NotificationRepository {
  findAll(): Promise<INotification[]> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<INotification> {
    throw new Error("Method not implemented.");
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
