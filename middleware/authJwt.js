const jwt = require('jsonwebtoken'); // Ensure this is imported
const db = require('../models');
const User = db.user;

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  // Check if the token is in the blacklist
  const blacklistedToken = await db.token_blacklist.findOne({ where: { token } });
  if (blacklistedToken) {
    return res.status(401).send({ message: 'Token has been invalidated!' });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token has expired!' });
      }
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};


const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: 'User not found!' });

    const roles = await user.getRoles();
    if (roles.some((role) => role.name === 'admin')) {
      return next(); // Proceed if the user is an admin
    }

    return res.status(403).send({ message: 'Require Admin Role!' });
  } catch (error) {
    console.error('Admin Check Error:', error.message);
    res.status(500).send({ message: 'Internal server error.' });
  }
};


const isFaculty = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  if (roles.some((role) => role.name === 'faculty')) return next();
  res.status(403).send({ message: 'Require Faculty Role!' });
};

const isSupervisor = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  if (roles.some((role) => role.name === 'supervisor')) return next();
  res.status(403).send({ message: 'Require Supervisor Role!' });
};

module.exports = { verifyToken, isAdmin, isFaculty, isSupervisor };
