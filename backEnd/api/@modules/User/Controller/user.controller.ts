import { Handler } from "express";

import { UserService } from "../Service/user.service";

export class UserController {
  private userService: UserService = new UserService();

  getUsers: Handler = async (_req, res) => {
    res.json({
      user: this.userService.findAll().user,
    });
  };
}
