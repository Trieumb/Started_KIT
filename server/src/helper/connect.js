
const dotenv = require ('dotenv');
dotenv.config ();

const mongoose = require('mongoose');

async function connectDB () {
  await mongoose.connect(process.env.mongodbURL);
  
  console.log('connect to db...');
}

module.exports = {connectDB: connectDB};
