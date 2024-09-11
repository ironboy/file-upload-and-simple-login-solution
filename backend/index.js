import fs from 'fs';
import express from 'express';
import crypto from "crypto";


const salt = "paraplanedasdadasjkdlasdasljasd2uas";

function getHash(toEncrypt) {
  let hash = crypto.pbkdf2Sync(toEncrypt, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash;
}

const app = express();

// serve the image folder under /user-data
const imageServer = express();
imageServer.use(express.static('images'));
app.use('/user-data', imageServer);

// make reading request bodies work
app.use(express.json({ limit: '10MB' }));

app.get('/api/test', (_req, res) => {
  res.json({ sucess: true });
});

// uploadImage/register
app.post('/api/uploadImage', (req, res) => {
  const { userName, password, encoded } = req.body;
  const binaryBuffer = Buffer.from(encoded.split('base64')[1], 'base64');
  const userFolder = './images/' + getHash(userName + password);
  // TODO: we should check if the folder exists here too,
  //       so that you can't overwrite someone elses data
  fs.mkdirSync(userFolder);
  fs.writeFileSync(userFolder + '/userProfileImage.jpg', binaryBuffer);
  fs.writeFileSync(userFolder + '/userData.json',
    JSON.stringify({ userName }, null, '  '), 'utf-8');
  res.json({ ok: true });
});

// login
app.post('/api/login', (req, res) => {
  const { userName, password } = req.body;
  const userFolder = './images/' + getHash(userName + password);
  if (fs.existsSync(userFolder)) {
    const userData = JSON.parse(fs.readFileSync(userFolder + '/userData.json', 'utf-8'));
    res.json({ ...userData, userFolder: userFolder.replace('./images', '/user-data') });
  }
  else {
    res.json({ error: 'No such user.' });
  }
});

app.listen(5001, () => console.log('Backend listening on http://localhost:5001'));
