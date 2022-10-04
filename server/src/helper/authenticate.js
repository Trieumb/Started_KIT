let fs = require("fs")
const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');

dotenv.config ();

EXPIRE_TIME = 3 * 60 * 60;
let encodeToken = (payload) => {
  let privateKey = fs.readFileSync("auth.privateKey");
  let token = jwt.sign (payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: EXPIRE_TIME,
  });
  return  token;
};

let decodeToken = (token) => {
  let publicKey = fs.readFileSync("auth.publicKey");
  let payload = jwt.verify (token, publicKey, {algorithm: 'RS256'});
  delete payload.iat;
  delete payload.exp;
  return payload;
};

module.exports = {
  encodeToken: encodeToken,
  decodeToken: decodeToken,
};
