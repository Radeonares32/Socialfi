import { IUser } from "../Entity/IUser";
import { UserRepository } from "../Repository/user.repository";
import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

// Security
import { security } from "../../../security/security";
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
            return res.properties;
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
    gender: string,
    biography: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$id}) set u.name=$name,u.surname=$surname,u.date=$date,u.gender=$gender,u.biography=$biography",
            { id, name, surname, date, gender, biography }
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
    gender: string,
    biography: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "create(:user {id:$id,name:$name,surname:$surname,date:$date,gender:$gender,biography:$biography})",
            { id, name, surname, date, gender, biography }
          )
          .catch((err) => console.log(err));

        resolve({ message: "success created" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  delete(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher("match(u:user {id:$id}) detach delete u", { id })
          .catch((err) => console.log(err));
        resolve({ message: "success deleted" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  signWallet(
    walletAddr: string
  ): Promise<{ token: string } | { isUser: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await this.find(walletAddr);
        if (user.length > 0) {
          const token = security.jwt.payload.signPayload({ walletAddr });
          if (token.payload) {
            resolve({ token: token.payload, isUser: "1" });
          } else {
            reject({ token: token.err });
          }
        } else {
          resolve({ isUser: "0", token: "0" });
        }
      } catch (err) {
        reject({ token: err });
      }
    });
  }
  loginWallet(
    walletAddr: string,
    name: string,
    surname: string,
    date: string,
    gender: string,
    biography: string
  ): Promise<{ token: string } | { message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const isUser: any = await this.find(walletAddr);
        if (isUser.length > 0) {
          const token = security.jwt.payload.signPayload({ walletAddr });
          if (token.payload) {
            resolve({ token: token.payload, message: "already" });
          } else {
            reject({ token: token.err });
          }
        } else {
          const user = await this.create(
            walletAddr,
            name,
            surname,
            date,
            gender,
            biography
          );
          if (user.message === "success created") {
            const token = security.jwt.payload.signPayload({ walletAddr });
            if (token.payload) {
              resolve({ token: token.payload, message: "1" });
            } else {
              reject({ message: token.err });
            }
          } else {
            reject({ message: user.message });
          }
        }
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  getFollow(walletAddr: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.cypher(
            "match (n:user {id:$walletAddr})-[:FOLLOW]->(n1:user) return n1",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rUser = user?.records.map((uss) => {
          return uss.map((res) => {
            return res;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  getFollowers(walletAddr: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.cypher(
            "match (n:user {id:$walletAddr})-[followers:FOLLOWERS]->(n1:user) return n1",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rUser = user?.records.map((uss) => {
          return uss.map((res) => {
            return res;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  postFollow(
    walletAddr: string,
    otherWalletAddr: string
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
  deleteFollow(
    walletAddr: string,
    otherWalletAddr: string
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
}
