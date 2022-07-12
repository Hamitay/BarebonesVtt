import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwtService from "../../core/jwt/jwtService";

export const authorized = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //Get cookie
    const jwt = req.cookies["AUTH_JWT"];

    if (!jwt) {
      return res.sendStatus(401);
    }

    const decodedJwt = jwtService.verifyJwt(jwt);
    const isAuthorized = roles.includes(decodedJwt.role);

    if (!isAuthorized) {
      return res.sendStatus(403);
    }

    const iat = decodedJwt.iat || 0;
    const exp = decodedJwt.exp || 0;

    if (iat - exp == 0) {
      console.log("JWT expired");
      return res.sendStatus(401);
    }
    next();
  };
};
