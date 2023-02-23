import { Request } from 'express';

export const getTokenFromRequest = (req: Request) => {
    const regExp = new RegExp(/(?<=refresh_token=)[^;]+(?!;)/);
    const refreshToken = regExp.exec(req.header('Cookie'));

    return refreshToken ? refreshToken[0] : null;
}