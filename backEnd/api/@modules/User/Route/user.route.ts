import express, { Handler } from "express";
const app = express.Router();

import { UserController } from "../Controller/user.controller";
import { Middlewares } from "../../../middleware/middleware";

const userController: UserController = new UserController();

//Get
export const getUsersRoute: Handler = app.get("/", userController.getUsers);
export const getUserRoute: Handler = app.get(
  "/profile/:id",
  userController.getUser
);
export const getFollowRoute: Handler = app.post(
  "/getFollow",
  Middlewares.userAuth,
  userController.getFollow
);
export const getFollowersRoute: Handler = app.post(
  "/getFollowers",
  Middlewares.userAuth,
  userController.getFollowers
);
export const getIsFollowRoute: Handler = app.post(
  "/getIsFollow",
  Middlewares.userAuth,
  userController.isFollow
);
export const getIsFollowersRoute: Handler = app.post(
  "/getIsFollowers",
  Middlewares.userAuth,
  userController.isFollowers
);

//Post
export const postUserRoute: Handler = app.post(
  "/create",
  userController.postUser
);
export const signWalletRoute: Handler = app.post(
  "/signWallet",
  userController.signWalletUser
);
export const loginWalletRoute: Handler = app.post(
  "/loginWallet",
  userController.loginWalletUser
);
export const postFollowRoute: Handler = app.post(
  "/postFollow",
  Middlewares.userAuth,
  userController.postFollow
);

//Put
export const putUserRoute: Handler = app.put("/update", userController.putUser);

//Delete
export const deleteUserRoute: Handler = app.delete(
  "/delete",
  userController.deleteUser
);
export const deleteFollowRoute: Handler = app.delete(
  "/deleteFollow",
  Middlewares.userAuth,
  userController.deleteFollow
);
