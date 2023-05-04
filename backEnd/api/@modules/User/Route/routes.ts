import express, { Handler } from "express";
const app = express.Router();

import {
  deleteUserRoute,
  getUserRoute,
  getUsersRoute,
  postUserRoute,
  putUserRoute,
  signWalletRoute,
  loginWalletRoute,
} from "./user.route";

export const userRoutes = app.use(
  "/user",
  deleteUserRoute,
  getUserRoute,
  getUsersRoute,
  postUserRoute,
  putUserRoute,
  signWalletRoute,
  loginWalletRoute
);
