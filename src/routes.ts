import { Router } from "express";
import { Login, OAuth2Callback, AuthenticateUser, Logout } from "./controllers/auth.controller";

export const routes = (router:Router) => {
    router.get('/api/login', Login);
    router.get('/api/logout', Logout);
    router.get('/api/oauth2callback', OAuth2Callback);
    router.get('/api/authenticate', AuthenticateUser);
}