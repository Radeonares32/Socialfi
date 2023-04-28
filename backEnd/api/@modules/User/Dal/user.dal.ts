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
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await neo4j()
          ?.readCypher("match(u:user {id:$id}) return u", { id })
          .catch((err) => console.log(err));
        const rUser = user.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rUser as IUser);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  update(
    id: string,
    name: string,
    surname: string,
    date: string,
    gender: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$id}) set u.name=$name,u.surname=$surname u.date=$date,u.gender=$gender",
            { id, name, surname, date, gender }
          )
          .catch((err) => console.log(err));

        resolve({ message: "success updated" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  create(
    id: string,
    name: string,
    surname: string,
    date: string,
    gender: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "create(:user {id:$id,name:$name,surname:$surname,date:$date,gender:$gender})",
            { id, name, surname, date, gender }
          )
          .catch((err) => console.log(err));

        resolve({ message: "success created" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}
