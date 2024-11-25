const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) return res.status(403).send({ message: 'No token provided!' });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' });
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  if (roles.some(role => role.name === 'admin')) return next();
  res.status(403).send({ message: 'Require Admin Role!' });
};

const authJwt = { verifyToken, isAdmin };
module.exports = authJwt;
