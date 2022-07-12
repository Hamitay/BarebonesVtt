import { UserRole } from "@prisma/client";

export type AuthJwtPayload = {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  role: UserRole;
};
