import { Game } from "@prisma/client";
import messageRepository from "../message/messageRepository";
import { NewMessageDTO } from "../message/types";
import gameRepository from "./gameRepository";

const createGame = async (name: string): Promise<Game | null> => {
  return await gameRepository.createGame(name);
};

const getGame = async (id: string): Promise<Game | null> => {
  const game = await gameRepository.getGame(id);

  if (!game) {
    throw new Error("Game not found");
  }

  return game;
};

const getAllGames = async (): Promise<Game[]> => {
  return await gameRepository.getAllGames();
};

const addMessageToGame = async (message: NewMessageDTO): Promise<void> => {
  return await messageRepository.createMessage(message);
};

export default {
  createGame,
  getGame,
  addMessageToGame,
  getAllGames,
};
