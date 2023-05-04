import { INotification } from "../Entity/INotification";

export interface NotificationRepository {
  findAll(): Promise<INotification[]>;
  find(id: string): Promise<INotification>;
  create(
    id: string,
    title: string,
    description: string,
    activityLink: string,
    walletAddr:string
  ): Promise<{ message: string }>;
  delete(id: string): Promise<{ message: string }>;
}
