const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const {connectDB} = require ('./src/helper/connect.js');
const oauthRouter = require('./src/routers/oauth.js');
const authRouter = require('./src/routers/auth.js');
const userRouter = require('./src/routers/user');
const session = require('express-session');
const passport = require('passport');

const app = express ();
const PORT = process.env.PORT || 5000;

app.use (express.json ());
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true, limit: '60mb'}));
app.use (cors ());


app.get ('/', (req, res) => {
  res.send ('Success');
});

app.use(session({
   secret: process.env.googleClientSecret,
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/oauth', oauthRouter);
app.use('/user', userRouter);


const error_handler = (err, req, res, next) => {
	console.error(err)
	res.status(500).json({
		detail: err.message
	})
}
app.use(error_handler)

app.listen (PORT, () => {
  console.log (`Server is running on port ${PORT}`);
  connectDB ();
});

module.exports = app;
