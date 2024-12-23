const express = require("express");
const cookieSession = require("cookie-session");
const db = require("./app/models");
const createDatabase = require("./createDatabase");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Apply cookie-session middleware before routes to ensure session management works
app.use(
  cookieSession({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

// Routes
const testRoutes = require('./app/routes/test.routes');  
const userRoutes = require("./app/routes/user.routes");
const authRoutes = require("./app/routes/auth.routes");
const scheduleTeacherRoutes = require("./app/routes/scheduleTeacher.routes");
const motivationRoutes = require('./app/routes/supervisor/motivation.routes');
const teachingAidRoutes = require('./app/routes/supervisor/teachingAid.routes');
const vocabularyRoutes = require('./app/routes/supervisor/vocabulary.routes');
const generalKnowledgeRoutes = require('./app/routes/supervisor/generalKnowledge.routes');
const learningOutcomeRoutes = require('./app/routes/supervisor/learningOutcome.routes');
const whyQuestionRoutes = require('./app/routes/supervisor/whyQuestion.routes');
const activitiesHomeworkRoutes = require('./app/routes/supervisor/activitiesHomework.routes');
const learningOutcome2Routes = require('./app/routes/supervisor/learningOutcome2.routes');
const stemRoutes = require('./app/routes/supervisor/stem.routes');
const physicalActivityRoutes = require('./app/routes/supervisor/physicalActivity.routes');
const teachingAidVideoRoutes = require('./app/routes/supervisor/teachingAidVideo.routes');
//Main --Routes
const submitRoutes = require('./app/routes/main/submit.routes');

app.use('/api/test', testRoutes);
app.use('/app', userRoutes);
app.use('/app', authRoutes);
app.use('/api/scheduleTeacher', scheduleTeacherRoutes);
app.use('/api/motivation', motivationRoutes);
app.use('/api/teachingAid', teachingAidRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/generalKnowledge', generalKnowledgeRoutes);
app.use('/api/learningOutcome', learningOutcomeRoutes);
app.use('/api/whyQuestion', whyQuestionRoutes);
app.use('/api/learningOutcome2', learningOutcome2Routes);
app.use('/api/activitiesHomework', activitiesHomeworkRoutes);
app.use('/api/stem', stemRoutes);
app.use('/api/physicalActivity', physicalActivityRoutes);
app.use('/api/teachingAidVideo', teachingAidVideoRoutes);
app.use('/api/submit', submitRoutes);


// Function to initialize data in the database
async function initializeData() {
  try {
    await db.standard.bulkCreate([
      { name: 'Pre-KG' },
      { name: 'LKG' },
      { name: 'UKG' },
      { name: 'I' },
      { name: 'II' },
      { name: 'III' },
      { name: 'IV' },
      { name: 'V' },
      { name: 'VI' },
      { name: 'VII' },
      { name: 'VIII' },
      { name: 'IX' },
      { name: 'X' },
      { name: 'XI' },
      { name: 'XII' },
    ]);

    await db.subject.bulkCreate([
      { name: 'Accountancy' },
      { name: 'Botany' },
      { name: 'Chemistry' },
      { name: 'Commerce' },
      { name: 'Computer Science' },
      { name: 'English' },
      { name: 'General Knowledge' },
      { name: 'Hindi' },
      { name: 'Mathematics' },
      { name: 'Physics' },
      { name: 'Science' },
      { name: 'Social Science' },
      { name: 'Tamil' },
      { name: 'Zoology' },
    ]);

    await db.division.bulkCreate([
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
    ]);

    console.log("Initial data added successfully.");
  } catch (error) {
    console.error("Error initializing data:", error.message);
  }
}

// Ensure database exists and then start server
createDatabase().then(() => {
  // Sync Sequelize models (create tables if they don't exist)
  db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database & tables ensured.");
    initializeData(); // Initialize standards, subjects, and divisions
    initialRoles(); // Insert default roles
  });

  // Start server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}).catch((err) => {
  console.error("Error starting server:", err.message);
});

// Initial role setup
function initialRoles() {
  db.role
    .bulkCreate([
      { id: 1, name: "user" },
      { id: 2, name: "moderator" },
      { id: 3, name: "admin" },
    ])
    .then(() => console.log("Default roles created"))
    .catch((err) => console.log("Default roles creation error:", err.message));
}
