import { Request, Response } from "express";
import { AuthenticateReqBody } from "./types";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import bcrypt from "bcrypt";

function createToken(sub: string, username: string): string {
  const token = jwt.sign(
    {
      sub,
      username,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );
  return token;
}

export async function authenticate(req: Request, res: Response) {
  try {
    const rbody: AuthenticateReqBody = req.body;

    if (!rbody.username) {
      res.status(400).json({
        message: "username is required",
      });
      return;
    }
    if (rbody.username.length < 3) {
      res.status(400).json({
        message: "username must be 3 or more characters long",
      });
      return;
    }
    if (!rbody.password) {
      res.status(400).json({
        message: "password is required",
      });
      return;
    }
    if (rbody.password.length < 4) {
      res.status(400).json({
        message: "password must be 4 or more characters long",
      });
      return;
    }

    const findUser = await User.findOne({ username: rbody.username });
    let token = "";

    if (findUser && (await bcrypt.compare(rbody.password, findUser.password))) {
      token = createToken(findUser._id.toString(), findUser.username);
      return res.json({ token, status: "exist" });
    }

    const hashedPassword = await bcrypt.hash(rbody.password, 10);
    const createdUser = await User.create({
      username: rbody.username,
      password: hashedPassword,
    });
    await createdUser.save();
    token = createToken(createdUser._id.toString(), createdUser.username);
    return res.json({ token, status: "created" });
  } catch (error: any) {
    return res.status(500).json({ message: "Cannot authenticate user" });
  }
}
