module.exports = (sequelize, Sequelize) => {
    return sequelize.define('learningOutcome', {
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
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    });
  };
  