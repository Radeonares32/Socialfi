import { Handler } from "express";
import { format } from "date-and-time";

import { PostService } from "../Service/post.service";

export class PostController {
  private postService: PostService = new PostService();
  getPostFindAll: Handler = async (_req, res) => {
    res.json({
      post: (await this.postService.findAll()).post,
    });
  };
  getPostUserFindAll: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      post: (await this.postService.findAllUser(token)).post,
    });
  };
  getPostFind: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      post: (await this.postService.find(token)).post,
    });
  };
  getPostUserFind: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { id } = req.body;
    res.json({
      post: (await this.postService.findUser(id, token)).post,
    });
  };
  postPostCreate: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { image } = req.files as any;
    const { title, description } = req.body;
    if (image) {
      res.json({
        post: (
          await this.postService.create(
            token,
            title,
            description,
            format(new Date(), "YYYY/MM/DD HH:mm:ss"),
            image[0]
          )
        ).post,
      });
    } else {
      res.json({
        post: (
          await this.postService.create(
            token,
            title,
            description,
            format(new Date(), "YYYY/MM/DD HH:mm:ss")
          )
        ).post,
      });
    }
  };
  putPostUpdate: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { image } = req.files as any;
    const { id, title, description } = req.body;
    if (image) {
      res.json({
        post: (
          await this.postService.update(
            id,
            token,
            title,
            description,
            format(new Date(), "YYYY/MM/DD HH:mm:ss"),
            image[0]
          )
        ).post,
      });
    } else {
      res.json({
        post: (
          await this.postService.update(
            id,
            token,
            title,
            description,
            format(new Date(), "YYYY/MM/DD HH:mm:ss")
          )
        ).post,
      });
    }
  };
}
