const db = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll({ include: ['roles'] });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) return res.status(404).send({ message: 'User not found!' });

    const roles = await db.role.findAll({ where: { name: req.body.roles } });
    await user.setRoles(roles);

    res.status(200).send({ message: 'User role updated successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) return res.status(404).send({ message: 'User not found!' });

    await user.destroy();
    res.status(200).send({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
