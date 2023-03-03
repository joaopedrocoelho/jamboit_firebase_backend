import e, { Request, Response } from "express";
import { getTokenFromRequest } from "../utils/cookies";
import { verify, JwtPayload } from "jsonwebtoken";
import { oAuth2Client } from "./auth.controller";
import { google, forms_v1, drive_v3 } from "googleapis";

export const getQuizzes = async (req: Request, res: Response) => {
    //get user refresh token
    const refreshToken = getTokenFromRequest(req);
    //#TODO check if there's a refreshToken, if not let's get the user e-mail from the request
    // and get the refresh token from the database
    if (!refreshToken) {
        res.status(401).send({
            message: "Unauthorized",
        });
        return res.end();
    }
    const decodedToken =
        verify(refreshToken, process.env.CLIENT_SECRET) as JwtPayload;

    //#TODO check if the token is valid, if not let's get the user e-mail from the request

    oAuth2Client.setCredentials({ refresh_token: decodedToken.refresh_token })
    //access google api with refresh token
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const { forms } = google.forms({ version: 'v1', auth: oAuth2Client });

    try {
        const { files: formsList } = await drive.files.list({
            corpora: 'user',
            q: "mimeType='application/vnd.google-apps.form'",
            //#TODO apparently the max page size is 1000, refactor this to get all the forms
            //in case the user has more than 1000 forms (and the response has incompleteSearch: true)
        }).then((response) => response.data);

        console.log(formsList)

        if (formsList.length === 0) {
            res.status(200).json([]);
            return res.end();
        }
        const quizList = await getQuizList(formsList, forms);


        res.status(200).json(quizList);
        return res.end();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error retrieving quizzes",
            error: error.message,
        });
    }

    //get all quizzes and folders from google drive

    //retrieve all quizzes from google drive
    //return quizzes

}

export const getQuizList = async (formsList: drive_v3.Schema$File[], forms: forms_v1.Resource$Forms) => {
    const quizList: forms_v1.Schema$Form[] = [];

    for (const form of formsList) {
        await forms.get({ formId: form?.id }).then((form) => {
            form.data?.settings?.quizSettings?.isQuiz ? quizList.push(form.data) : null;
        });
    }

    return quizList;
}