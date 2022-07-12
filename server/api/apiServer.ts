import cors from "cors";
import express from "express";
import Controller from "./controllers/Controller";
import gameController from "./controllers/game";
import authController from "./controllers/auth";
import cookieParser from "cookie-parser";

// Add config
const REST_API_PORT = 5000;

const serve = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  const controllers: Controller[] = [authController, gameController];

  controllers.forEach((controller) => {
    app.use(controller.getRootRoute(), controller.getRouter());
    console.log(`${controller.getRootRoute()} registered`);
  });

  app.listen(REST_API_PORT, () => {
    console.log("REST API running on port " + REST_API_PORT);
  });
};

export default {
  serve,
};
