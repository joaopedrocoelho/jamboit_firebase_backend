import { AppDataSource } from "../data-source";
import { User } from "../entity";

export interface UserDAO<T> {
    getUserByEmail(email: string): Promise<T>;
    addUser(user: Partial<T>): Promise<Partial<T> | T>;
    updateRefreshToken(email: string, refreshToken: string): Promise<Partial<T> | T>;
  }


    export const typeORMUserDAO:UserDAO<User> = {
        getUserByEmail: async (email: string) => {
            return await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne()
        },
        addUser: async ({displayName, email, photo, refreshToken } ) => {
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
        }
  };