import app from "./app";
import { dbConnect } from "./db";
import { Server } from "socket.io";
import { Message } from "./models/message";

const port = process.env.PORT || 5000;

async function init() {
  await dbConnect();
  const server = app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("message", async (message) => {
      const createdMessage = await Message.create(message);
      await createdMessage.save();
      io.emit("message", message);
    });
  });
}

init();
