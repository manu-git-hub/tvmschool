module.exports = (sequelize, DataTypes) => {
    const FiveWQuestions = sequelize.define('five_w_questions', {
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
      questions: {
        type: DataTypes.JSON, 
        allowNull: false,
      },
    });
    return FiveWQuestions;
  };
  
