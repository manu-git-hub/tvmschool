// models/vocabulary.model.js
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('vocabulary', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      teacherId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      word: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      meaning: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      exampleSentence: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    });
  };
  