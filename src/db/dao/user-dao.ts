import { AppDataSource } from "../../express";
import { User } from "../entity/user.entity";
import { verify, JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface UserDAO<T> {
  getUserByEmail(email: string): Promise<T>;
  getUserByRefreshToken(refreshToken: string): Promise<T>;
  addUser(user: Partial<T>): Promise<Partial<T> | T>;
  updateRefreshToken(
    email: string,
    refreshToken: string
  ): Promise<Partial<T> | T>;
  decodeJWTToken(token: string): {
    error: VerifyErrors;
    decodedToken: JwtPayload;
  };
}

export const typeORMUserDAO: UserDAO<User> = {
  getUserByEmail: async (email: string) => {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();
  },
  getUserByRefreshToken: async (refreshToken: string) => {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.refreshToken = :refreshToken", {
        refreshToken: refreshToken,
      })
      .getOne();
  },
  addUser: async ({ displayName, email, photo, refreshToken }) => {
    const user = new User();
    user.displayName = displayName;
    user.email = email;
    user.photo = photo;
    user.refreshToken = refreshToken;
    return await AppDataSource.getRepository(User).save(user);
  },
  updateRefreshToken: async (email: string, refreshToken: string) => {
    const user = await typeORMUserDAO.getUserByEmail(email);
    user.refreshToken = refreshToken;
    return await AppDataSource.getRepository(User).save(user);
  },
  decodeJWTToken: (token: string) => {
    let decodedToken: JwtPayload;
    let error: VerifyErrors;
    verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
      error = err;
      decodedToken = decoded as JwtPayload;
    });
    return { error: error, decodedToken: decodedToken };
  },
};
