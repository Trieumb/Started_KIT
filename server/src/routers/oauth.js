const express = require ('express');
const oauthRouter = express.Router ();
const passport = require ('passport');
require ('../helper/passport.js');

const CLIENT_URL = 'http://192.168.1.8:5000';

oauthRouter.get ('/login/failed', (req, res) => {
  res.status (401).json ({
    success: false,
    message: 'failure!',
  });
});
oauthRouter.get ('/login/success', (req, res) => {
  if (req.user) {
    res.status (200).json ({
      success: true,
      message: 'successfull!',
      user: req.user,
    });
  }
});
oauthRouter.get ('/logout', (req, res) => {
  req.logout ();
  res.redirect (CLIENT_URL);
});
oauthRouter.get (
  '/auth/google',
  passport.authenticate ('google', {
    scope: ['profile', 'email'],
  })
);
oauthRouter.get ('/auth/google/callback', passport.authenticate ('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/login/failed',
}));

oauthRouter.get("/auth/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

oauthRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = oauthRouter;