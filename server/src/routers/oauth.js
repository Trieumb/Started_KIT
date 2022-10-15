const express = require ('express');
const authRouter = express.Router ();
const passport = require ('passport');
require ('../helper/passport.js');

const CLIENT_URL = 'http://localhost:5000';

authRouter.get ('/login/failed', (req, res) => {
  res.status (401).json ({
    success: false,
    message: 'failure!',
  });
});
authRouter.get ('/login/success', (req, res) => {
  if (req.user) {
    res.status (200).json ({
      success: true,
      message: 'successfull!',
      user: req.user,
    });
  }
});
authRouter.get ('/logout', (req, res) => {
  req.logout ();
  res.redirect (CLIENT_URL);
});
authRouter.get (
  '/auth/google',
  passport.authenticate ('google', {
    scope: ['profile', 'email'],
  })
);
authRouter.get ('/auth/google/callback', passport.authenticate ('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/login/failed',
}));

authRouter.get("/auth/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = authRouter;