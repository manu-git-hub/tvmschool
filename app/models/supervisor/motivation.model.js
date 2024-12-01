module.exports = (sequelize, Sequelize) => {
    return sequelize.define('motivations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teacherId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      motivationText: {
        type: Sequelize.STRING(250), // Max 250 characters
        allowNull: false,
      },
    });
  };
  