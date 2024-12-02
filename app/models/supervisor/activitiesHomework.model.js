module.exports = (sequelize, Sequelize) => {
    return sequelize.define('activitiesHomework', {
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
      text: {
        type: Sequelize.STRING(300), // Max 300 characters
        allowNull: false,
      },
    });
  };
  