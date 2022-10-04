const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const router = require ('./src/routers/users.js');
const {connectDB} = require ('./src/helper/connect.js');
const main = require ('./src/routing.js');

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

app.use ('/login', router);
app.use (main);



app.listen (PORT, () => {
  console.log (`Server is running on port ${PORT}`);
  connectDB ();
});

module.exports = app;
