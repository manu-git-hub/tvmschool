module.exports = (sequelize, DataTypes) => {
    const PhysicalActivity = sequelize.define('physical_activities', {
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
      content: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
    return PhysicalActivity;
  };
  