import { security } from "../../../security/security";

import { NotificationDal } from "../Dal/notification.dal";

export class NotificaitonService {
  private notificationDataAccess: NotificationDal = new NotificationDal();
  async findAll(walletAddr: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(walletAddr);
    console.log(verifyWalletAddr);
    return {
      notification: await this.notificationDataAccess.findAll(walletAddr),
    };
  }
  async find(id: string, walletAddr: string) {
    return {
      notification: await this.notificationDataAccess.find(id, walletAddr),
    };
  }
  async create(
    title: string,
    description: string,
    activityLink: string,
    walletAddr: string
  ) {
    return {
      notification: (
        await this.notificationDataAccess.create(
          title,
          description,
          activityLink,
          walletAddr
        )
      ).message,
    };
  }
  async delete(id: string) {
    return {
      notification: (await this.notificationDataAccess.delete(id)).message,
    };
  }
}
