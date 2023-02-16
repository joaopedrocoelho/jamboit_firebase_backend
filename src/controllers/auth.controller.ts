import e, { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { firebaseApp, database } from "../firebase";
import { getDatabase, ref, set, push, query, orderByChild, equalTo, get } from "firebase/database";
import { User } from "../models/user.model";
import dotenv from 'dotenv';

dotenv.config();

const oAuth2Client = new OAuth2Client(
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


export const oAuth2Callback = async (req: Request, res: Response) => {
    const code = req.query.code;
 
    if (code) {
        console.log(`Code is ${code}`);
        // Now that we have the code, use that to acquire tokens
        try {
            const tokens = await oAuth2Client.getToken(code as string);
            console.info('Tokens acquired.');
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(tokens.tokens);

            // Check if a refresh token was returned
            if (tokens.tokens.refresh_token) {
                console.info('Refresh token acquired.');
            } else {
                console.warn('No refresh token returned.');
            }
            const { people, person, error } = await getUserInfo(oAuth2Client);
            if (error) {
                throw error
            }

            // Extract the user's display name, email, and photo
            const displayName = person.names[0].displayName;
            const email = person.emailAddresses[0].value;
            const photo = person.photos[0].url;

            const user = await retrieveUser(email);
            if (user) {
                console.log('User already exists', user);

                res.cookie('refresh_token',
                    JSON.stringify(tokens.tokens.refresh_token),
                    { maxAge: 900000, httpOnly: true })

                return res.status(200).send({
                    status: 'success',
                    message: 'User already exists',
                    data: {
                        displayName,
                        email,
                        photo,
                    }
                })
            }

            const { newUserId, error: saveToDBError } =
                await saveUserToDB(email, displayName, photo, tokens.tokens.refresh_token);

            if (saveToDBError) {
                throw saveToDBError
            }

            res.cookie('refresh_token',
                JSON.stringify(tokens.tokens.refresh_token),
                { maxAge: 900000, httpOnly: true })

            //#TODO add params to redirect
            return res.redirect('http://localhost:5000/create');
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

        return { people, person }
    } catch (error) {
        console.log('error', error)
        return { error }
    }

}


const retrieveUser = async (email: string): Promise<User> => {
    const usersRef = ref(database, '/users');
    const queryRef = query(usersRef, orderByChild('email'), equalTo(email));


    // Find a user with email "john.doe@example.com"
    get(queryRef)
        .then((snapshot) => {

            if (snapshot.exists()) {
                const userId = Object.keys(snapshot.val())[0];
                console.log(`User found with ID ${userId}`);

                return snapshot.val()[userId] as User;
                // Do something with the user data...
            } else {
                console.log('User not found');

            }
        })
        .catch((error) => {
            console.error('Error finding user:', error);
        });
    return null;
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


const authenticateUser = async (refreshToken: string) => {
    const auth = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
  
    auth.setCredentials({
      refresh_token: refreshToken
    });
  
    const accessToken = await auth.getAccessToken();
    if(accessToken.res.status == 200) {
    return auth;
    } 
    return null;
  }