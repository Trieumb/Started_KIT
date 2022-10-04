const express = require ('express');
const mainRouter = express.Router ();
const {extractAuthenticationInfo} = require ('./middleware/auth.js');
const { HTTPErorrHandler } = require ('./exception/HTTPException.js');

const {
  createUser,
  authenticateUser,
  updateUserInformation,
  logOutUser,
} = require ('./controllers/users.js');


let mw = (req, res, next) => {
  console.log ('First direction');
  next ();
  res.json ({message: 'fail b/c mw'});
};
mainRouter.post ('/sign-up', createUser);
mainRouter.post ('/sign-in', authenticateUser);
mainRouter.put ('/users-update',extractAuthenticationInfo, updateUserInformation);
mainRouter.post ('/log-out',extractAuthenticationInfo, logOutUser);

mainRouter.use (HTTPErorrHandler);

module.exports = mainRouter;
