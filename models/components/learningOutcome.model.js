module.exports = (sequelize, DataTypes) => {
    const LearningOutcome = sequelize.define('learning_outcomes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      faculty_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lp_cycle_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outcomes: {
        type: DataTypes.JSON, 
        allowNull: false,
      },
    });
    return LearningOutcome;
  };
  