import { Router } from "express";
import * as controller from "./controller";
import passport from "passport";

export const messageRouter = Router();

messageRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getMessages
);
