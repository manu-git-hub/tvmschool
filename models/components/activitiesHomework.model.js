module.exports = (sequelize, DataTypes) => {
    const ActivitiesHomework = sequelize.define('activities_homework', {
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
    return ActivitiesHomework;
  };
  