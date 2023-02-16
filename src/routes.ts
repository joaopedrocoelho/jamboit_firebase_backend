import { Router } from "express";
import { Login, oAuth2Callback } from "./controllers/auth.controller";

export const routes = (router:Router) => {
    router.get('/login', Login);
    router.get('/oauth2callback', oAuth2Callback);
}