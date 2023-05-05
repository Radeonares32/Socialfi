import { IPost } from "../Entity/IPost";

export interface PostRepository {
  findAll(): Promise<IPost[]>;
  findAllUser(walletAddr: string): Promise<IPost[]>;
  find(id: string): Promise<IPost>;
  findUser(id: string, walletAddr: string): Promise<IPost>;
  create(
    walletAddr: string,
    title: string,
    description: string,
    date: string,
    image?: string
  ): Promise<{ message: string }>;
  update(
    walletAddr: string,
    title: string,
    description: string,
    date: string,
    image?: string
  ): Promise<{ message: string }>;
  delete(id: string, walletAddr: string): Promise<{ message: string }>;
}
