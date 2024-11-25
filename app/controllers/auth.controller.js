const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const roles = req.body.roles || ['user'];
  const rolesData = await Role.findAll({ where: { name: roles } });
  await user.setRoles(rolesData);
  res.send({ message: 'User registered successfully!' });
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(404).send({ message: 'User Not found.' });

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) return res.status(401).send({ message: 'Invalid Password!' });

  const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
  req.session.token = token;
  res.status(200).send({ username: user.username, token });
};
