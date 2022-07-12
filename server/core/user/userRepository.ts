import { PrismaClient, User, UserRole } from "@prisma/client";

const db = new PrismaClient();

const createUser = async (
  name: string,
  email: string,
  passwordMd5: string
): Promise<User> => {
  return await db.user.create({
    data: { role: UserRole.USER, name, email, passwordMd5 },
  });
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  return await db.user.findFirst({ where: { email } });
};

export default { createUser, getUserByEmail };
