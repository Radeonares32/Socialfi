import { v4 as uuid } from "uuid";

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
    walletAddr: string,
    title: string,
    description: string,
    date: string,
    image?: string | undefined
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        if (image) {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$walletAddr}) create(p:post{id:$id,title:$title,description:$description,date:$date,image:$image}) create(u)-[:userPostRel]->(p)",
              { id: uuid(), walletAddr, title, description, date, image }
            )
            .catch((err) => console.log(err));
          resolve({ message: "success created post" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$walletAddr}) create(p:post{id:$id,title:$title,description:$description,date:$date}) create(u)-[:userPostRel]->(p)",
              { id: uuid(), walletAddr, title, description, date }
            )
            .catch((err) => console.log(err));
          resolve({ message: "success created post" });
        }
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  update(
    id: string,
    walletAddr: string,
    title: string,
    description: string,
    date: string,
    image?: string | undefined
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        if (image) {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$walletAddr})-[:userPostRel]->(p:post {id:$id}) set p.title=$title,p.description=$description,p.date=$date,p.image=$image return p",
              { id, walletAddr, title, description, date, image }
            )
            .catch((err) => console.log(err));
          resolve({ message: "success updated post" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$walletAddr})-[:userPostRel]->(p:post {id:$id}) set p.title=$title,p.description=$description,p.date=$date return p",
              { id, walletAddr, title, description, date }
            )
            .catch((err) => console.log(err));
          resolve({ message: "success updated post" });
        }
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  delete(id: string, walletAddr: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$walletAddr})-[:userPostRel]->(p:post {id:$id}) detach delete p",
            { id, walletAddr }
          )
          .catch((err) => console.log(err));
        resolve({ message: "success delete post" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}
