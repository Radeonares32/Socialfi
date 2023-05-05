import express, { Handler } from "express";
const app = express.Router();

import {
  deletePost,
  getFind,
  getFindAll,
  getFindAllUser,
  getFindUser,
  postPost,
  putPost,
} from "./post.route";

export const postRoutes = app.use(
  "/post",
  deletePost,
  getFind,
  getFindAll,
  getFindAll,
  getFindAllUser,
  getFindUser,
  postPost,
  putPost
);
