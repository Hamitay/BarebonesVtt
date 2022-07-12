import { PrismaClient } from "@prisma/client";
import { NewMessageDTO } from "./types";

const db = new PrismaClient();

const createMessage = async (newMessage: NewMessageDTO) => {
  db.message.create({
    data: {
      content: newMessage.content,
      authorId: newMessage.authorId,
      gameId: newMessage.gameId,
    },
  });
};

export default {
  createMessage,
};
