const config = require('../config/db.config');
const Sequelize = require('sequelize');

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

// Import models
db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.standard = require('./teacherSchedule/standard.model')(sequelize, Sequelize);
db.subject = require('./teacherSchedule/subject.model')(sequelize, Sequelize);
db.division = require('./teacherSchedule/division.model')(sequelize, Sequelize);
db.scheduleTeacher = require('./teacherSchedule/scheduleTeacher.model')(sequelize, Sequelize);
db.motivation = require('./supervisor/motivation.model')(sequelize, Sequelize);
db.teachingAid = require('./supervisor/teachingAid.model')(sequelize, Sequelize);

// Define role-user many-to-many relationship
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

// Define schedule relationships
db.scheduleTeacher.belongsTo(db.user, { foreignKey: 'teacherId', targetKey: 'id' });
db.scheduleTeacher.belongsTo(db.standard, { foreignKey: 'standardId' });
db.scheduleTeacher.belongsTo(db.subject, { foreignKey: 'subjectId' });
db.scheduleTeacher.belongsTo(db.division, { foreignKey: 'divisionId' });

// Define relationships
db.motivation.belongsTo(db.user, { foreignKey: 'teacherId', targetKey: 'id' });
db.teachingAid.belongsTo(db.user, { foreignKey: 'teacherId', targetKey: 'id' });

// Add constants
db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
