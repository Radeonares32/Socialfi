import express, { Handler } from "express";
const app = express.Router();

import { PostController } from "../Controller/post.controller";
import { Middlewares } from "../../../middleware/middleware";
const postController: PostController = new PostController();

//Get
export const getFindAll: Handler = app.get("/", postController.getPostFindAll);
export const getFindAllUser: Handler = app.get(
  "/userPost",
  Middlewares.userAuth,
  postController.getPostUserFindAll
);
export const getFind: Handler = app.get(
  "/:id",
  Middlewares.userAuth,
  postController.getPostFind
);
export const getFindUser: Handler = app.get(
  "/userPost/:id",
  Middlewares.userAuth,
  postController.getPostUserFind
);

//Post
export const postPost: Handler = app.post(
  "/create",
  [Middlewares.multer.postUploads, Middlewares.userAuth],
  postController.postPostCreate
);

//Put
export const putPost: Handler = app.put(
  "/update",
  [Middlewares.multer.postUploads, Middlewares.userAuth],
  postController.putPostUpdate
);

//Delete
export const deletePost: Handler = app.delete(
  "/delete",
  Middlewares.userAuth,
  postController.deletePostDelete
);
