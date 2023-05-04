import { UserDal } from "../Dal/user.dal";

export class UserService {
  private userDataAccess: UserDal = new UserDal();
  findAll() {
    return {
      user: this.userDataAccess.findAll(),
    };
  }
  async find(id: string) {
    return {
      user: await this.userDataAccess.find(id),
    };
  }
  async update(
    id: string,
    name: string,
    surname: string,
    date: string,
    gender: string,
    biography: string
  ) {
    return {
      user: (
        await this.userDataAccess.update(
          id,
          name,
          surname,
          date,
          gender,
          biography
        )
      ).message,
    };
  }
  async create(
    id: string,
    name: string,
    surname: string,
    date: string,
    gender: string,
    biography: string
  ) {
    return {
      user: (
        await this.userDataAccess.create(
          id,
          name,
          surname,
          date,
          gender,
          biography
        )
      ).message,
    };
  }
  async delete(id: string) {
    return {
      user: (await this.userDataAccess.delete(id)).message,
    };
  }
  async signWallet(walletAddr: string) {
    return {
      user: await this.userDataAccess.signWallet(walletAddr),
    };
  }
  async loginWallet(
    walletAddr: string,
    name: string,
    surname: string,
    date: string,
    gender: string,
    biography: string
  ) {
    return {
      user: (await this.userDataAccess.loginWallet(walletAddr,name,surname,date,gender,biography))
    }
  }
}
