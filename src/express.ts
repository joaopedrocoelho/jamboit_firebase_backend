import { OAuth2Client } from "google-auth-library";
import http from "http";
import url from "url";
import open from "open";
import destroyer from "server-destroy";
import { google } from "googleapis";
import path from "path";
import express from "express";
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();


const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];


const app = express();

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URIS
);

// Generate the url that will be used for the consent dialog.
const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
});



app.listen("3000", () => {
    console.log("Server is running on port 3000");
    // open the browser to the authorize url to start the workflow
    open(authorizeUrl, { wait: false }).then(cp => cp.unref());
});

app.get("/", (req, res) => {
    res.send("<h1>Hello!</h1>");

});

app.get('/login', async (req, res) => {
    res.send('<h1>Login!</h1>');
    const qs = new url.URL(req.url, 'http://localhost:3000')
        .searchParams;
    const code = qs.get('code');
    console.log(`Code is ${code}`);
     // Now that we have the code, use that to acquire tokens.
     const r = await oAuth2Client.getToken(code);
     // Make sure to set the credentials on the OAuth2 client.
     oAuth2Client.setCredentials(r.tokens);
     console.info('Tokens acquired.');
     listFiles(oAuth2Client);
});

async function listFiles(authClient) {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length === 0) {
      console.log('No files found.');
      return;
    }
  
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  }
