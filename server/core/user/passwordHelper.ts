import { hashSync, compareSync } from "bcrypt";

const SALT_ROUNDS = 5;

const hashString = (input: string): string => {
  return hashSync(input, SALT_ROUNDS);
};

const compareHashedStrings = (data: string, hash: string): boolean => {
  return compareSync(data, hash);
};

export default {
  hashString,
  compareHashedStrings,
};
