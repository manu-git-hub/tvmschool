module.exports = (sequelize, DataTypes) => {
    const STEM = sequelize.define('stem', {
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
      science: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      technology: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      engineering: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mathematics: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    return STEM;
  };
  