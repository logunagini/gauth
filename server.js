const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '314139210737-r47oh2abplkat5e68nq0pund9jl87aea.apps.googleusercontent.com';

const app = express();
const client = new OAuth2Client(CLIENT_ID);

app.use(bodyParser.json());

app.post('/tokensignin', async (req, res) => {
  const { idtoken } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: idtoken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    
    res.send(`User ID: ${userid}`);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:5500');
});
