const bcrypt = require ('bcrypt');
const {HTTPError} = require ('../exception/HTTPException.js');
const {encodeToken, decodeToken} = require ('../helper/authenticate');
const {db} = require ('./../helper/connect.js');
const asyncHandler = require ('express-async-handler');

// sign-up
const createUser = asyncHandler (async (req, res) => {
  let salt = await bcrypt.genSalt (10);
  let hash = await bcrypt.hashSync (req.body.password, salt);
  let user = {
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
  };
  let result = await db.db.collection ('users').findOne ({
    email: user.email,
  });
  if (result != null) throw new HTTPError (404, 'Email is existed!');
  await db.db.collection ('users').insert (user);
  res.status (201).json ({
    message: 'Created',
  });
});

// sign-in
const authenticateUser = asyncHandler (async (req, res) => {
  let user = await db.db.collection ('users').findOne ({email: req.body.email});
  if (!user) throw new HTTPError (404, 'Email not found!');
  let validPassword = await bcrypt.compare (req.body.password, user.password);
  if (!validPassword) throw new HTTPError (404, 'Password wrong!');
  if (user && validPassword) {
    let token = encodeToken (user);
    res.cookie ('token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    });
    res.status (200).json ({
      token: token,
    });
  }
});

const logOutUser = asyncHandler (async (req, res) => {
  // token = token.filter (token => token !== req.body.token);
  res.clearCookie ('token');
  res.status (200).json ('Logged out successfully!');
});

// update user

const updateUserInformation = asyncHandler (async (req, res) => {
  let user = {
    email: req.body.email,
    phone: req.body.phone,
    name: req.body.name,
  };
  // verify info

  let result = await db.db.collection ('users').findOne ({
    email: user.email,
  });
  console.log(result);
  if (result === null) throw new HTTPError (404, 'Email not exist!');
  await db.db.collection ('users').updateOne (
    {email: user.email},
    {
      $set: {
        name: user.name,
        phone: user.phone,
      },
    }
  );
  res.json ({
    message: 'Updated!',
  });
});

let deleteUser = asyncHandler (async (req, res) => {
  let result = await db.db.collection ('users').findOne ({
    email: req.params.email,
  });
  if (result === null) {
    throw new HTTPError (404, 'Email not exist!');
  } else {
    await db.db.collection ('users').remove ({email: result.email});
    res.status (200).json ({
      message: 'deleted!',
    });
  }
});
module.exports = {
  createUser: createUser,
  authenticateUser: authenticateUser,
  updateUserInformation: updateUserInformation,
  deleteUser: deleteUser,
  logOutUser: logOutUser
};
