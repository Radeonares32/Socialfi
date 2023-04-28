import { IUser } from "../Entity/IUser";
import { UserRepository } from "../Repository/user.repository";
import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

export class UserDal implements UserRepository {
  findAll(): Promise<IUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await neo4j()
          ?.readCypher("match(u:user) return u", {})
          .catch((err) => console.log(err));
        const rUser = user.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rUser as IUser[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  find(id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string,
    name: string,
    surname: string,
    image: string,
    date: string,
    gender: string
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
  create(
    id: string,
    name: string,
    surname: string,
    image: string,
    date: string,
    gender: string
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
}
