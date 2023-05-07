import { Handler } from "express";

import { UserService } from "../Service/user.service";
import { security } from "../../../security/security";

export class UserController {
  private userService: UserService = new UserService();

  getUsers: Handler = async (_req, res) => {
    res.json({
      user: await this.userService.findAll().user,
    });
  };
  getUser: Handler = async (req, res) => {
    const { id } = req.params as any;
    res.json({
      user: (await this.userService.find(id)).user,
    });
  };
  postUser: Handler = async (req, res) => {
    const { id, name, surname, date, gender, biography } = req.body;
    res.json({
      user: (
        await this.userService.create(
          id,
          name,
          surname,
          date,
          gender,
          biography
        )
      ).user,
    });
  };
  putUser: Handler = async (req, res) => {
    const { id, name, surname, date, gender, biography } = req.body;
    res.json({
      user: (
        await this.userService.update(
          id,
          name,
          surname,
          date,
          gender,
          biography
        )
      ).user,
    });
  };
  deleteUser: Handler = async (req, res) => {
    const { id } = req.body;
    res.json({
      user: (await this.userService.delete(id)).user,
    });
  };
  signWalletUser: Handler = async (req, res) => {
    const { walletAddr } = req.body;
    res.json({
      user: (await this.userService.signWallet(walletAddr)).user,
    });
  };
  loginWalletUser: Handler = async (req, res) => {
    const { walletAddr, name, surname, date, gender, biography } = req.body;
    res.json({
      user: (
        await this.userService.loginWallet(
          walletAddr,
          name,
          surname,
          date,
          gender,
          biography
        )
      ).user,
    });
  };
  getFollow: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      user: (await this.userService.getFollow(token)).user,
    });
  };
  getFollowers: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      user: (await this.userService.getFollowers(token)).user,
    });
  };
  postFollow: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { otherWalletAddr } = req.body;
    res.json({
      user: (await this.userService.postFollow(token, otherWalletAddr)).user,
    });
  };
  deleteFollow: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { otherWalletAddr } = req.body;
    res.json({
      user: (await this.userService.deleteFollow(token, otherWalletAddr)).user,
    });
  };
  isFollow: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { otherWalletAddr } = req.body;
    res.json({
      user: (await this.userService.isFollow(token, otherWalletAddr)).user,
    });
  };
  isFollowers: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    const { otherWalletAddr } = req.body;
    res.json({
      user: (await this.userService.isFollowers(token, otherWalletAddr)).user,
    });
  };
  userFollows: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      user: (await this.userService.userFollows(token)).user,
    });
  };
  userFollowers: Handler = async (req, res) => {
    const token = req.headers["x-access-token"] as string;
    res.json({
      user: (await this.userService.userFollowers(token)).user,
    });
  };
}
