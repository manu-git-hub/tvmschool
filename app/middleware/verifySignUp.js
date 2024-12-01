const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // const user = await User.findOne({ where: { username: req.body.username } });
  // if (user) return res.status(400).send({ message: 'Username is already in use!' });

  const emailUser = await User.findOne({ where: { email: req.body.email } });
  if (emailUser) return res.status(400).send({ message: 'Email is already in use!' });

  next();
};

const verifySignUp = { checkDuplicateUsernameOrEmail };
module.exports = verifySignUp;
