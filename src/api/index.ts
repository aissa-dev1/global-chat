import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import { authRouter } from "./auth";
import { messageRouter } from "./message";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/messages", messageRouter);

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

export default router;
