const Sequelize = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.lesson_plan_assignment = require('./lessonPlanAssignment.model')(sequelize, Sequelize);
db.physical_activities = require('./components/physicalActivity.model')(sequelize, Sequelize);
db.motivations = require('./components/motivation.model')(sequelize, Sequelize);
db.teaching_aid_others = require('./components/teachingAidOthers.model')(sequelize, Sequelize);
db.stem = require('./components/stem.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.ROLES = ['admin', 'faculty', 'supervisor'];

module.exports = db;
