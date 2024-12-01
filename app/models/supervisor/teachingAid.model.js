module.exports = (sequelize, Sequelize) => {
    return sequelize.define('teachingAids', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teacherId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // Assuming 'users' table exists for teachers
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      teachingAidText: {
        type: Sequelize.STRING(300), // Set maximum length to 300 characters
        allowNull: false,
      },
    });
  };
  