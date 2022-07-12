import { Game, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const createGame = async (name: string): Promise<Game> => {
  return await db.game.create({ data: { name, gameState: {} } });
};

const getGame = async (id: string): Promise<Game | null> => {
  return await db.game.findFirst({ where: { id } });
};

const getAllGames = async (): Promise<Game[]> => {
  return await db.game.findMany();
};

const addMessageToGame = async (
  id: string,
  message: any
): Promise<Game | null> => {
  return await db.game.update({ where: { id }, data: {} });
};

export default {
  createGame,
  getGame,
  getAllGames,
};
