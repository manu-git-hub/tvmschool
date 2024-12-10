module.exports = (sequelize, DataTypes) => {
    const Evaluation = sequelize.define('evaluations', {
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
      evaluation_text: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
    });
    return Evaluation;
  };
  