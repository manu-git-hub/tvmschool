module.exports = (sequelize, Sequelize) => {
    return sequelize.define('lesson_plan_assignment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      faculty_id: {
        type: Sequelize.STRING, // Use STRING if `faculty_id` is stored like '0002'
        allowNull: false,
      },
      subject_name: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      grade: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      division: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      lp_cycle_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      term: {
        type: Sequelize.ENUM('Term-1', 'Term-2', 'Term-3'),
        allowNull: false,
      },
      lesson_plan_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_submission: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      lp_due_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_of_approval: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('pending', 'reviewed', 'completed'),
        defaultValue: 'pending', 
      },
    });
  };
  