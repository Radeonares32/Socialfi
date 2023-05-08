import express, { Handler } from "express";
const app = express.Router();

import {
  getFindAllChatRoute,
  getFindAllMessageRoute,
  getFindChatMessageUserRoute,
  getFindChatMessagesRoute,
  getFindChatRoomUserRoute,
  getFindChatRoute,
  getFindMessageRoute,
  getFindMessageUserRoute,
  getFindUserChatRoomRoute,
  getFindUserMessageRoute,
  postCreateChatRoomRoute,
  postCreateUserMessageRoute,
  getUserRoomRoute,
} from "./chat.route";

export const chatRoutes: Handler = app.use(
  "/chat",
  getFindAllChatRoute,
  getFindAllMessageRoute,
  getFindChatMessageUserRoute,
  getFindChatMessagesRoute,
  getFindChatRoomUserRoute,
  getFindChatRoute,
  getFindMessageRoute,
  getFindMessageUserRoute,
  getFindUserChatRoomRoute,
  getFindUserMessageRoute,
  postCreateChatRoomRoute,
  postCreateUserMessageRoute,
  getUserRoomRoute
);
