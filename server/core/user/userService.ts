import { User } from "@prisma/client";
import userRepository from "./userRepository";
import passwordHelper from "./passwordHelper";
import { CreateUserDTO, LoginDTO } from "./types";

const createUser = async (createUserDTO: CreateUserDTO): Promise<User> => {
  const { name, email, password } = createUserDTO;
  const passwordMd5 = passwordHelper.hashString(password);

  return await userRepository.createUser(name, email, passwordMd5);
};

const loginUser = async (loginDTO: LoginDTO): Promise<User> => {
  const user = await getUserByEmail(loginDTO.email);

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = passwordHelper.compareHashedStrings(
    loginDTO.password,
    user.passwordMd5
  );

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return user;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.getUserByEmail(email);
};

const validateAuthInfo = (user: User, password: string): boolean => {
  return passwordHelper.compareHashedStrings(password, user.passwordMd5);
};

export default {
  createUser,
  loginUser,
};
