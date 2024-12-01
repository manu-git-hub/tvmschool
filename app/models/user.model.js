// module.exports = (sequelize, Sequelize) => {
//     return sequelize.define('users', {
//       username: { type: Sequelize.STRING },
//       email: { type: Sequelize.STRING },
//       password: { type: Sequelize.STRING },
//     });
//   };
  
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
};
