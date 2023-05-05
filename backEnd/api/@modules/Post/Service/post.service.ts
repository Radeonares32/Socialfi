import { security } from "../../../security/security";

import { PostDal } from "../Dal/post.dal";

export class PostService {
  private postDal: PostDal = new PostDal();
  async findAll() {
    return {
      post: await this.postDal.findAll(),
    };
  }
  async findAllUser(token:string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    return {
        post:await this.postDal.findAllUser(verifyWalletAddr.token?.payload?.walletAddr as string)
    }
  }
  async find(token:string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    return {
        post:await this.postDal.find(verifyWalletAddr.token?.payload?.walletAddr as string)
    }
  }
  async findUser(id:string,token:string) {
    const verifyWalletAddr = security.jwt.token.verifyToken(token);
    return {
        post:await this.postDal.findUser(id,verifyWalletAddr.token?.payload?.walletAddr as string)
    }
  }
}
