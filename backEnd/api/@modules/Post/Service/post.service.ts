import { security } from "../../../security/security";

import { PostDal } from "../Dal/post.dal";

import { NotificaitonService } from '../../Notification/Service/notification.service'

export class PostService {
  private postDal: PostDal = new PostDal();
  private notificationService:NotificaitonService = new NotificaitonService()
  async findAll() {
    return {
      post: await this.postDal.findAll(),
    };
  }
  async findAllUser(token: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    return {
      post: await this.postDal.findAllUser(
        verifyWalletAddr.token?.payload?.walletAddr as string
      ),
    };
  }
  async find(id: string) {
    return {
      post: await this.postDal.find(
        id
      ),
    };
  }
  async findUser(id: string, token: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    return {
      post: await this.postDal.findUser(
        id,
        verifyWalletAddr.token?.payload?.walletAddr as string
      ),
    };
  }
  async create(
    token: string,
    title: string,
    description: string,
    date: string,
    image?: string
  ) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    if (image) {
      return {
        post: await this.postDal.create(
          verifyWalletAddr.token?.payload?.walletAddr as string,
          title,
          description,
          date,
          image
        ),
      };
    } else {
      return {
        post: await this.postDal.create(
          verifyWalletAddr.token?.payload?.walletAddr as string,
          title,
          description,
          date
        ),
      };
    }
  }
  async update(
    id: string,
    token: string,
    title: string,
    description: string,
    date: string,
    image?: string
  ) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    if (image) {
      return {
        post: await this.postDal.update(
          id,
          verifyWalletAddr.token?.payload?.walletAddr as string,
          title,
          description,
          date,
          image
        ),
      };
    } else {
      return {
        post: await this.postDal.update(
          id,
          verifyWalletAddr.token?.payload?.walletAddr as string,
          title,
          description,
          date
        ),
      };
    }
  }
  async delete(id: string, token: string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    return {
      post: await this.postDal.delete(
        id,
        verifyWalletAddr.token?.payload?.walletAddr as string
      ),
    };
  }
}
