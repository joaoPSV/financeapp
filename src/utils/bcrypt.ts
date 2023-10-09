import { hashSync, compareSync } from 'bcrypt';

export const encryptPassword = (password: string): string => {
  const saltOrRounds = Number(process.env.BCRYPT_SALT);
  const hash = hashSync(password, saltOrRounds);
  return hash;
};

export const verifyPassword = (
  password: string,
  encryptedPassword: string,
): boolean => {
  const comparePassword = compareSync(password, encryptedPassword);
  return comparePassword;
};
