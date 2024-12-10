module.exports = (sequelize, DataTypes) => {
    const GeneralKnowledge = sequelize.define('general_knowledge', {
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
      items: {
        type: DataTypes.JSON, 
        allowNull: false,
      },
    });
    return GeneralKnowledge;
  };
  
