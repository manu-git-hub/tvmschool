module.exports = (sequelize, Sequelize) => {
  return sequelize.define('roles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, // Automatically increment IDs
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true, // Role names should be unique
    },
  });
};
