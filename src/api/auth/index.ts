import { Router } from "express";
import * as controller from "./controller";
import "../../passport";

export const authRouter = Router();

authRouter.post("", controller.authenticate);
