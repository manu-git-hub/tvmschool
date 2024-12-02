module.exports = (sequelize, Sequelize) => {
    return sequelize.define('stem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
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
      science: {
        type: Sequelize.STRING(550), // Max 550 characters
        allowNull: true,
      },
      technology: {
        type: Sequelize.STRING(550), // Max 550 characters
        allowNull: true,
      },
      engineering: {
        type: Sequelize.STRING(550), // Max 550 characters
        allowNull: true,
      },
      mathematics: {
        type: Sequelize.STRING(550), // Max 550 characters
        allowNull: true,
      },
    });
  };
  