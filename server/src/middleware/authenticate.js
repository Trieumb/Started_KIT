const  jwt = require('jsonwebtoken');
let fs = require("fs");

const authentication = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if(token){
            const accessToken  = token.split(' ')[1];
            jwt.verify(accessToken, fs.readFileSync("auth.publicKey"), (err, user) => {
                if(err){
                    res.status(403).json('Token invalid!')
                }
                req.user = user;
                next();
            });
        }else {
            res.status(401).json('You are not authenticated!');
        }
    },
    verifyTokenAndUserAuthorization: (req, res, next) => {
        verifyToken(req, res, () => {
          if (req.user.id === req.params.id|| req.user.admin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
      },
    verifytokenAdmin: (req, res, next) => {
        authentication.verifyToken(req, res, () => {
            if(req.user.admin){
                next();
            }else {
                res.status(403).json('You are not allowed to delete!')
            }
        })
    }
}
module.exports = authentication;