const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const {connectDB} = require ('./src/helper/connect.js');
const main = require ('./src/routing.js');
const authRouter = require('./src/routers/oauth.js')
const cookieSession = require('cookie-session');
const session = require('express-session')
const passport = require('passport');

const app = express ();
const PORT = process.env.PORT || 3000;

app.use (express.json ());
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true, limit: '30mb'}));
app.use (cors ());

app.get ('/', (req, res) => {
  res.send ('Success');
});

app.use (main);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.googleClientSecret],
//   })
// )


app.use(session({
   secret: process.env.googleClientSecret,
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.listen (PORT, () => {
  console.log (`Server is running on port ${PORT}`);
  connectDB ();
});

module.exports = app;
