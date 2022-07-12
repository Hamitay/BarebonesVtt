import { JwtPayload, sign, verify } from "jsonwebtoken";
import { AuthJwtPayload } from "./types";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set");
}

const expiresIn = "7d";

const createAuthJwt = (payload: AuthJwtPayload): string => {
  return sign(payload, JWT_SECRET, { expiresIn: expiresIn });
};

const verifyJwt = (token: string): JwtPayload => {
  try {
    return verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error("Error verifying jwt");
    throw new Error("Error verifying jwt");
  }
};

export default {
  createAuthJwt,
  verifyJwt,
};
