import e, { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { firebaseApp, database } from "../firebase";
import { ref, set, push, query, orderByChild, equalTo, get, update } from "firebase/database";
import dotenv from 'dotenv';
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { typeORMUserDAO as UserDao } from "../db/dao/user-dao";
import { nextTick } from "process";

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

//#TODO: Move this to a utils file
export const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URIS
);

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/forms.body',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',];

export const Login = async (req: Request, res: Response) => {
    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
    });
    res.send(authorizeUrl);
}


export const OAuth2Callback = async (req: Request, res: Response) => {
    const code = req.query.code;

    if (code) {
        console.log(`Code is ${code}`);
        // Now that we have the code, use that to acquire tokens
        try {
            const { tokens } = await oAuth2Client.getToken(code as string);
            console.info('Tokens acquired.');
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(tokens);

            // Check if a refresh token was returned
            if (tokens.refresh_token) {
                console.info('Refresh token acquired.');
            } else {
                console.warn('No refresh token returned.');
            }
            const { person, error } = await getUserInfo(oAuth2Client);
            console.log('Person', person);
            console.log('Error', error);
            if (error) {
                throw error
            }

            // Extract the user's display name, email, and photo
            const displayName = person.names[0].displayName;
            const email = person.emailAddresses[0].value;
            const photo = person.photos[0].url;

            const encodedToken = sign(
                { refresh_token: tokens.refresh_token },
                process.env.CLIENT_SECRET,
                {
                    expiresIn: '7d',
                }
            )

            const user = await UserDao.getUserByEmail(email);
            if (user) {
                console.log('User already exists', user);

                const { refreshToken: newToken } = await UserDao.updateRefreshToken(email, encodedToken);


                if (!newToken) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error refreshing token',
                        error: 'Error refreshing token'
                    })
                }

                res.cookie('refresh_token',
                    encodedToken,
                    { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })

                return res.redirect('http://localhost:5000/');


            }

            const newUser =
                await UserDao.addUser({ displayName, email, photo, refreshToken: encodedToken });

            if (!newUser) {
                throw new Error('Error creating user');
            }

            res.cookie('refresh_token',
                encodedToken,
                { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none' })

            //#TODO add params to redirect
            return res.redirect('http://localhost:5000/');
        } catch (error) {
            console.log('error', error)
            //#TODO: Redirect error
            return res.status(500).send({
                status: 'error',
                message: 'Error logging in',
                data: error
            })
        }

    } else {
        return res.status(400).send({
            status: 'error',
            message: 'No code provided',
            data: null
        })
    }
}

export const AuthenticateUser = async (req: Request, res: Response) => {
    try {
        const regExp = new RegExp(/(?<=refresh_token=)[^;]+(?!;)/);
        const refreshToken = regExp.exec(req.header('Cookie'));


        if (!refreshToken) {
            return res.status(200).send({
                status: "not logged",
                message: "No access token",
                data: ""
            });
        }


        const { error: decodeError, decodedToken } = UserDao.decodeJWTToken(refreshToken[0]);

        if (decodeError) {
            return res.clearCookie('refresh_token', { path: '/', domain: 'localhost', httpOnly: true, sameSite: 'none' })
            .status(500).send({
                message: "Couldn't decode token",
            });
        }


        if (decodedToken?.refresh_token == null) {
            return res.clearCookie('refresh_token', { path: '/', domain: 'localhost', httpOnly: true, sameSite: 'none' })
            .status(500).send({
                message: "Couldn't decode token",
            })
        }


        oAuth2Client.setCredentials({ refresh_token: decodedToken.refresh_token });

        const { person, error } = await getUserInfo(oAuth2Client);

        if (error) {
            return res.status(401).send({
                message: "Invalid access token",
            });

        }

        // Extract the user's display name, email, and photo 
        const email = person.emailAddresses[0].value;
        const user = await UserDao.getUserByEmail(email);

        if (!user) {
            return res.status(401).send({
                message: "User doesn't exist",
            });
        }


        return res.status(200).send({
            status: 'success',
            message: 'User authenticated',
            data: JSON.stringify(user)
        })


    } catch (error) {
        console.log('error', error);
        return res.status(500).send({
            message: "Internal server error",
        });
    }

}


export const Logout = async (req: Request, res: Response) => {
    res.clearCookie('refresh_token', { path: '/', domain: 'localhost', httpOnly: true, sameSite: 'none' }).send({
        status: 'success',
        message: 'User logged out',
    });
    return res.end();
}



const getUserInfo = async (oAuth2Client: OAuth2Client) => {
    try {
        // Get the user's information from the Google People API
        const people = google.people({
            version: 'v1',
            auth: oAuth2Client
        });
        const { data: person } = await people.people.get({
            resourceName: 'people/me',
            personFields: 'names,emailAddresses,photos'
        });

        return { person }
    } catch (error) {
        console.log('error', error)
        return { error }
    }

}


const clearRefreshToken = async (res: Response) => {
    await res.clearCookie('refresh_token', { path: '/', domain: 'localhost', httpOnly: true, sameSite: 'none' }).send({
        status: 'success',
        message: 'User logged out',
    });
}

/* const getUserByEmail = async (email: string) => {
    const usersRef = ref(database, '/users');
    const queryRef = query(usersRef, orderByChild('email'), equalTo(email));


    // Find a user with email "john.doe@example.com"
    return await get(queryRef)
        .then((snapshot) => {

            if (snapshot.exists()) {
                const userId = Object.keys(snapshot.val())[0];
                console.log(`User found with ID ${userId}`);
                const val = snapshot.val();

                return snapshot.val()[userId] as UserModel;
                // Do something with the user data...
            } else {
                console.log('User not found');
                return null;

            }
        })
}



const saveUserToDB = async (displayName: string, email: string, photo: string, refreshToken: string) => {
    // Add a new user to the "users" location in the database
    const newUserRef = push(ref(database, 'users'));
    const newUserId = newUserRef.key;

    // Set the user data on the new child node
    const result = await set(newUserRef, {
        displayName,
        email,
        photo,
        createdAt: Date.now(),
        refreshToken: refreshToken,
    }).then(() => {
        console.log('new user saved to DB with ID' + newUserId)
        return {
            newUserId,
            error: null
        };
    }).catch((error) => {
        console.log('error saving user to DB', error);
        return {
            newUserId,
            error
        };
    });

    return {
        newUserId: result.newUserId,
        error: result?.error
    };
}

const updateRefreshToken = async (email: string, refreshToken: string) => {
    const usersRef = ref(database, '/users');
    const queryRef = query(usersRef, orderByChild('email'), equalTo(email));

    // Find a user with that email and update the refresh token
    return await get(queryRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userId = Object.keys(snapshot.val())[0];
                console.log(`User found with ID ${userId}`);
                // Update the user's refresh token
                return update(ref(database, `users/${userId}`), {
                    ['/refreshToken']: refreshToken,
                })
                    .then(() => {
                        console.log('Refresh token updated for user with ID ' + userId)
                        return {
                            userId,
                            error: null
                        }
                    })
                    .catch((error) => {
                        console.log('error updating refresh token for user with ID ' + userId, error);
                        return {
                            userId,
                            error
                        }
                    });
            } else {
                return {
                    userId: null,
                    error: 'User not found'
                };
            }
        })

}
 */