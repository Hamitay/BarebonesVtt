import { UserRole } from "@prisma/client";
import { Router } from "express";
import gameService from "../../../core/game/gameService";
import { authorized } from "../../middlewares/auth";

const ROOT_ROUTE = "/game";
const router = Router();

router.use(authorized([UserRole.ADMIN, UserRole.USER]));

router.post("", async (req, res) => {
  const { body } = req;

  const newGame = await gameService.createGame(body.name);

  return res.send(newGame);
});

router.get("", async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    return res.send(games);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Get game
    const game = await gameService.getGame(id);

    return res.send(game);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
});

export default {
  getRootRoute: () => ROOT_ROUTE,
  getRouter: () => router,
};
