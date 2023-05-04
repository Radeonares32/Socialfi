import express, { Handler } from "express";
const app = express.Router();

import { UserController } from "../Controller/user.controller";

const userController: UserController = new UserController();

//Get
export const getUsersRoute: Handler = app.get("/", userController.getUsers);
export const getUserRoute: Handler = app.get(
  "/profile/:id",
  userController.getUser
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

//Put
export const putUserRoute: Handler = app.put("/update", userController.putUser);

//Delete
export const deleteUserRoute: Handler = app.delete(
  "/delete",
  userController.deleteUser
);
