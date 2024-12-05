const db = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll({ include: ['roles'] });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUsersByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    // Validate status
    if (!['active', 'suspended', 'deactivated'].includes(status)) {
      return res.status(400).send({ message: 'Invalid status!' });
    }

    // Fetch users by status
    const users = await db.user.findAll({ where: { status } });

    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send({ message: 'An error occurred while fetching users.' });
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

exports.updateStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    // Validate status
    if (!['active', 'suspended', 'deactivated'].includes(status)) {
      return res.status(400).send({ message: 'Invalid status!' });
    }

    // Update user status
    const user = await db.user.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    user.status = status;
    await user.save();

    res.status(200).send({ message: `User status updated to ${status}.` });
  } catch (error) {
    console.error('Error updating user status:', error.message);
    res.status(500).send({ message: 'An error occurred while updating user status.' });
  }
};

exports.forceDelete = async (req, res) => {
  try {
    const { userId } = req.body;

    // Delete user
    const result = await db.user.destroy({ where: { id: userId } });
    if (result === 0) {
      return res.status(404).send({ message: 'User not found!' });
    }

    res.status(200).send({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting the user.' });
  }
};

