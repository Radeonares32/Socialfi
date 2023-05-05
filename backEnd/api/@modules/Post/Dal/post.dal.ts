import { security } from "../../../security/security";
import { neo4j } from "../../../../core/dataSource/neo4j/neo4j";

import { PostRepository } from "../Repository/post.repository";
import { IPost } from "../Entity/IPost";

export class PostDal implements PostRepository {
  findAll(): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher("match(p:post) return p", {})
          .catch((err) => console.log(err));
        const rPost = post.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rPost as IPost[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findAllUser(walletAddr: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher(
            "match(u:user {id:$walletAddr}) match(p:post) match(u)-[:userPostRel]->(p) return p",
            { walletAddr }
          )
          .catch((err) => console.log(err));
        const rPost = post.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rPost as IPost[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  find(id: string): Promise<IPost> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher("match(p:post {id:$id})", { id })
          .catch((err) => console.log(err));
        const rPost = post.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rPost as IPost);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  findUser(id: string, walletAddr: string): Promise<IPost> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher(
            "match(u:user {id:$walletAddr}) match(p:post {id:$id}) match(u)-[:userPostRel]->(p) return p",
            { walletAddr, id }
          )
          .catch((err) => console.log(err));
        const rPost = post.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rPost as IPost);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  create(
    id: string,
    walletAddr: string,
    title: string,
    description: string,
    date: string,
    image?: string | undefined
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string,
    walletAddr: string,
    title: string,
    description: string,
    date: string,
    image?: string | undefined
  ): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, walletAddr: string): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
}
