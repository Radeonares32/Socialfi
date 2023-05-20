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
            return res.properties;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  isFollow(walletAddr: string, otherWalletAddr: string): Promise<Number> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.readCypher(
            "match(u1:user {id:$walletAddr}) match(u2:user {id:$otherWalletAddr}) match(u1)-[follow:FOLLOW]->(u2) return count(follow)",
            { walletAddr, otherWalletAddr }
          )
          .catch((err) => console.log(err));
        const rUser: any = user?.records.map((uss) => {
          return uss.map((res) => {
            return res;
          });
        });
        resolve(rUser[0][0].low as Number);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  isFollowers(walletAddr: string, otherWalletAddr: string): Promise<Number> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.readCypher(
            "match(u1:user {id:$walletAddr}) match(u2:user {id:$otherWalletAddr}) match(u1)-[followers:FOLLOWERS]->(u2) return count(followers)",
            { walletAddr, otherWalletAddr }
          )
          .catch((err) => console.log(err));
        const rUser: any = user?.records.map((uss) => {
          return uss.map((res) => {
            return res;
          });
        });

        resolve(rUser[0][0].low as Number);
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
            return res.properties;
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
    return new Promise(async (resolve, reject) => {
      try {
        const isFollow: any = await this.isFollow(walletAddr, otherWalletAddr);

        const isFollowers: any = await this.isFollowers(
          walletAddr,
          otherWalletAddr
        );

        if (isFollow >= 1 || isFollowers >= 1) {
          resolve({ message: "Already following" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match (f1:user {id:$walletAddr}) match(f2:user {id:$otherWalletAddr}) create(f1)-[follow:FOLLOW]->(f2) create (f2)-[followers:FOLLOWERS]->(f1)",
              { walletAddr, otherWalletAddr }
            )
            .catch((err) => console.log(err));

          resolve({ message: "Success following" });
        }
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  deleteFollow(
    walletAddr: string,
    otherWalletAddr: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(f1:user {id:$walletAddr})-[follow:FOLLOW]->(f2:user {id:$otherWalletAddr}) match(f2:user {id:$otherWalletAddr})-[followers:FOLLOWERS]->(f1:user {id:$walletAddr}) delete followers,follow",
            { walletAddr, otherWalletAddr }
          )
          .catch((err) => console.log(err));
        resolve({ message: "Success un follow" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  userFollows(walletAddr: string): Promise<IUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.readCypher(
            "match(u1:user) match(u:user) where u.id <> $walletAddr and not (u)-[:FOLLOWERS]->(u1)  and not (u)-[:FOLLOW]->(u1) return u",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rUser: any = user?.records.map((uss) => {
          return uss.map((res) => {
            return res.properties;
          });
        });
        resolve(rUser as IUser[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  userFollowers(walletAddr: string): Promise<IUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.readCypher(
            "match(u1:user) match(u:user) where u.id <> $walletAddr and not (u)-[:FOLLOWERS]->(u1)  and not (u)-[:FOLLOW]->(u1) return u",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rUser: any = user?.records.map((uss) => {
          return uss.map((res) => {
            return res.properties;
          });
        });
        resolve(rUser as IUser[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}
