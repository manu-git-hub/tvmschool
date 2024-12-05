module.exports = (sequelize, Sequelize) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: Sequelize.STRING,
      unique: true, // Ensure userID is unique
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
  });
};
