const db = require('../models');
const bcrypt = require('bcryptjs');

const initializeRoles = async () => {
  try {
    // Define required roles
    const requiredRoles = ['admin', 'faculty', 'supervisor'];

    // Create roles if they don't exist
    for (const role of requiredRoles) {
      await db.role.findOrCreate({ where: { name: role } });
    }

    // Check if the admin user exists
    const adminEmail = 'admin@example.com';
    const adminUser = await db.user.findOne({ where: { email: adminEmail } });

    if (!adminUser) {
      // Generate unique userID
      const lastUser = await db.user.findOne({ order: [['id', 'DESC']] });
      const nextUserID = lastUser ? String(parseInt(lastUser.id) + 1).padStart(4, '0') : '0001';

      // Create the admin user
      const hashedPassword = bcrypt.hashSync('adminpassword', 8);
      const user = await db.user.create({
        userID: nextUserID, // Assign userID
        username: 'AdminUser',
        email: adminEmail,
        password: hashedPassword,
      });

      // Assign the admin role
      const adminRole = await db.role.findOne({ where: { name: 'admin' } });
      await user.addRole(adminRole);

      console.log(`Admin account created: ${adminEmail} / UserID: ${nextUserID} / Password: adminpassword`);
    } else {
      console.log('Admin account already exists.');
    }
  } catch (error) {
    console.error('Error initializing roles or admin account:', error.message);
  }
};

module.exports = initializeRoles;
