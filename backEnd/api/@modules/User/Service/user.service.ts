import { UserDal } from "../Dal/user.dal";

export class UserService {
  private userDataAccess: UserDal = new UserDal();
  findAll() {
    return {
      user: this.userDataAccess.findAll(),
    };
  }
  find(id: string) {
    return {
      user: this.userDataAccess.find(id),
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
    const user = await this.userDataAccess.update(
      id,
      name,
      surname,
      date,
      gender,
      biography
    );
    if (user.message) {
      return {
        user: user.message,
      };
    } else {
      return {
        user,
      };
    }
  }
}
