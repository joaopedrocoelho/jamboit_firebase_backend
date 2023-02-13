import { promises as fsPromises } from 'fs';
import express from 'express';
import cors from 'cors';
import * as path from 'path';
import * as process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { BaseExternalAccountClient, OAuth2Client } from 'google-auth-library';


/* const app = express();
app.use(cors({
  origin: ['https://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'
  ],
  credentials: true // this will allow cookies to be sent accross domains
}))

app.listen('3000', () => {
  console.log('Server is running on port 3000')



})

app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
})


app.get('/login', (req, res) => {
  res.send('<h1>Login!</h1>');
  authorize().then((authClient) => {
    //send request to /auth/google
    res.send(authClient);

  });
}); 

app.get('/ouath2callback', (req, res) => {
  res.send('<h1>Google!</h1>');
})*/

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './test.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fsPromises.readFile(TOKEN_PATH, { encoding: 'utf8' });
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fsPromises.readFile(TOKEN_PATH, { encoding: 'utf8' });
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fsPromises.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  console.log('Loading credentials...')

  let oauth2client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  return oauth2client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
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

authorize().then((authClient) => {
  listFiles(authClient);
});