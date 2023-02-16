
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from "./routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

routes(app);



app.listen("3000", () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");

});


/* app.post('/getUserForms', async (req: Record<string, any>, res) => {
  console.log('getting forms')
  const auth = JSON.parse(decodeURIComponent(req.query.oauth));
  await getAllForms(auth);

});
 */
/* async function getAllForms(auth: OAuth2Client) {

  const drive = google.drive({ version: "v3", auth: auth });
  const forms = google.forms({
    version: "v1",
    auth: auth,
  });

  const params = { q: "mimeType='application/vnd.google-apps.form'" };

  const res = await drive.files.list(params);
  let userForms = [];
  for (const form of res.data.files) {
    const loadedForm = await forms.forms.get({ formId: form.id });
    console.log('searching for quizzes')
    if (loadedForm.data?.settings?.quizSettings.isQuiz == true) {
      console.log('Found a Quiz!')
      userForms.push(loadedForm.data);
    }

  }

  console.log('userForms', userForms);
  return userForms;
}
 */
