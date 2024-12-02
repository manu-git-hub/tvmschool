module.exports = (sequelize, Sequelize) => {
    return sequelize.define('teacherPhysicalActivity', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      activityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'physicalActivities',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  };
  