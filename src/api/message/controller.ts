import { Request, Response } from "express";
import { Message } from "../../models/message";

function validateLimit(limit: any): number {
  const parsedLimit = parseInt(limit, 10);
  if (isNaN(parsedLimit) || parsedLimit < 0) {
    return 25;
  }
  return parsedLimit;
}

export async function getMessages(req: Request, res: Response) {
  try {
    const queryLimit = validateLimit(req.query.limit);
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(queryLimit);
    const reversedMessages = messages.reverse();
    return res.json({ messages: reversedMessages });
  } catch (error: any) {
    return res.status(500).json({ message: "Cannot get messages" });
  }
}
