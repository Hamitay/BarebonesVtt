import { User } from "@prisma/client";
import { Response, Router } from "express";
import jwtService from "../../../core/jwt/jwtService";
import { AuthJwtPayload } from "../../../core/jwt/types";
import { CreateUserDTO, LoginDTO } from "../../../core/user/types";

import userService from "../../../core/user/userService";

const ROOT_ROUTE = "/auth";
const router = Router();

// Create user
router.post("/signup", async (req, res) => {
  const { body } = req;

  const createUserDTO: CreateUserDTO = {
    email: body.email,
    password: body.password,
    name: body.name,
  };

  //TODO: Add handling for duplicated email
  const newUser = await userService.createUser(createUserDTO);

  return withJwtCookie(res, newUser).sendStatus(201);
});

//Login
router.post("/signin", async (req, res) => {
  const { body } = req;

  const loginDTO: LoginDTO = {
    ...body,
  };

  try {
    const user = await userService.loginUser(loginDTO);
    return withJwtCookie(res, user).sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});

const withJwtCookie = (res: Response, user: User): Response => {
  return res.cookie("AUTH_JWT", buildJwtFromUser(user));
};

const buildJwtFromUser = (user: User) => {
  const jwtPayload: AuthJwtPayload = {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updateAt,
    id: user.id,
    role: user.role,
  };

  return jwtService.createAuthJwt(jwtPayload);
};

export default {
  getRootRoute: () => ROOT_ROUTE,
  getRouter: () => router,
};
