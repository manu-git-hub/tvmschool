module.exports = (sequelize, Sequelize) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('active', 'suspended', 'deactivated'),
      defaultValue: 'active', // Default status for new users
    },
  });
};
