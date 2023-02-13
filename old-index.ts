"use strict";

const path = require("path");
const googleForms = require("@googleapis/forms");
const googleDrive = require("@googleapis/drive");
const { authenticate } = require("@google-cloud/local-auth");

const formID = "11mA4x60XfNGHhHWoPKQvz2vNj9FrXwVgmVpcmV2_m_0";

async function getAllForms() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "keys.json"),
    scopes: [
      "https://www.googleapis.com/auth/drive.metadata.readonly",
      "https://www.googleapis.com/auth/forms.body.readonly",
    ],
  });

  const drive = googleDrive.drive({ version: "v3", auth: auth });
  const forms = googleForms.forms({
    version: "v1",
    auth: auth,
  });

  const params = { q: "mimeType='application/vnd.google-apps.form'" };

  const res = await drive.files.list(params);
  let userForms = [];
  for (const form of res.data.files) {
    const loadedForm = await forms.forms.get({ formId: form.id });
    console.log('searching for quizzes')
    if(loadedForm.data?.settings?.quizSettings.isQuiz == true) {
      console.log('Found a Quiz!')
      userForms.push(loadedForm.data);
    }
   
  }

  console.log('userForms', userForms);
  return res.data;
}

getAllForms();

async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "keys.json"),
    scopes: "https://www.googleapis.com/auth/forms.body.readonly",
  });
  const forms = googleForms.forms({
    version: "v1",
    auth: auth,
  });

  const res = await forms.forms.get({ formId: formID });
  console.log(res.data);
  const questions = res.data["items"];
  questions.forEach((element) => {
    console.log(element["questionItem"]);
  });
  return res.data;
}
