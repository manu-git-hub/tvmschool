module.exports = (sequelize, Sequelize) => {
    const PhysicalActivity = sequelize.define('physicalActivity', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false, // Max length depends on your needs
      },
    });
  
    // Seed the database with hardcoded physical activities
    PhysicalActivity.seed = async () => {
      const activities = [
        { id: 1, description: 'Physical Activity - 1 - play' },
        { id: 2, description: 'Physical Activity - 2 - game' },
        { id: 3, description: 'Physical Activity - 3 - dance' },
        { id: 4, description: 'Physical Activity - 4 - sing' },
        { id: 5, description: 'Physical Activity - 5 - loop' },
        { id: 6, description: 'Physical Activity - 6 - jump' },
        { id: 7, description: 'Physical Activity - 7 - walk' },
        { id: 8, description: 'Physical Activity - 8 - swim' },
        { id: 9, description: 'Physical Activity - 9 - climb' },
        { id: 10, description: 'Physical Activity - 10 - throw' },
        { id: 11, description: 'Physical Activity - 11 - catch' },
        { id: 12, description: 'Physical Activity - 12 - stretch' },
        { id: 13, description: 'Physical Activity - 13 - run' },
        { id: 14, description: 'Physical Activity - 14 - sit' },
      ];
  
      for (const activity of activities) {
        const exists = await PhysicalActivity.findByPk(activity.id);
        if (!exists) {
          await PhysicalActivity.create(activity);
        }
      }
    };
  
    return PhysicalActivity;
  };
  