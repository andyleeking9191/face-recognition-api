const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true
    }
  });

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('it is working!')});
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImagePut(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(PORT || 3001, () => console.log(`The server is running on port ${PORT}.`));
