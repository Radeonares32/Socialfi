import { Handler } from "express";

import { UserService } from "../Service/user.service";

export class UserController {
  private userService: UserService = new UserService();

  getUsers: Handler = async (_req, res) => {
    res.json({
      user: await this.userService.findAll().user,
    });
  };
  getUser: Handler = async (req, res) => {
    const { id } = req.query as any;
    res.json({
      user: this.userService.find(id).user,
    });
  };
  postUser: Handler = async (req, res) => {
    const { id, name, surname, date, gender, biography } = req.body;
    res.json({
      user: await this.userService.create(
        id,
        name,
        surname,
        date,
        gender,
        biography
      ),
    });
  };
}
