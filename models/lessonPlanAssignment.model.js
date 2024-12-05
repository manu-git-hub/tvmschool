module.exports = (sequelize, Sequelize) => {
    return sequelize.define('lesson_plan_assignment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      faculty_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      academic_year: {
        type: Sequelize.STRING,
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
      subject_name: {
        type: Sequelize.JSON,
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
      lp_cycle_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lp_due_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_of_submission: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_of_approval: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('pending', 'submitted', 'draft', 'approved',  'resubmitted'),
        defaultValue: 'pending',
      },

    /**
     * For future --------------------
     */

    //   compliance_status : {
    //     type: Sequelize.ENUM('draft', 'before time', 'on time', 'draft', 'overdue',  'resubmitted'),
    //     defaultValue: 'draft',
    //   },
    //   faculty_remarks: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   },
    //   approve_remarks: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   },
    });
  };
  