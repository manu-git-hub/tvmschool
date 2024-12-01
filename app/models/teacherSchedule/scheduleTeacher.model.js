module.exports = (sequelize, Sequelize) => {
    return sequelize.define('scheduleTeachers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teacherId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // Reference the 'users' table
          key: 'id', // Reference the 'id' field in the 'users' table
        },
        onDelete: 'CASCADE',
      },
      standardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      divisionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  };
  