module.exports = (sequelize, Sequelize) => {
    return sequelize.define('teachingAidVideo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
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
      videoLink: {
        type: Sequelize.STRING, // No specific character limit for URLs
        allowNull: false,
        validate: {
          isUrl: true, // Ensures the input is a valid URL
        },
      },
    });
  };
  