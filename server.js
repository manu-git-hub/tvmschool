const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const createDatabase = require('./createDatabase');
const initializeRoles = require('./utils/roleInitializer');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SECRET || 'defaultSecret',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
);

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const testRoutes = require('./routes/test.routes');
const lessonPlanRoutes = require('./routes/lessonPlan.routes');

// Import component-specific routes
const physicalActivityRoutes = require('./routes/components/physicalActivity.routes');
// const motivationRoutes = require('./routes/components/motivation.routes');
// const teachingAidOthersRoutes = require('./routes/components/teachingAidOthers.routes');
// const stemRoutes = require('./routes/components/stem.routes');
// const vocabularyRoutes = require('./routes/components/vocabulary.routes');
// const fiveWQuestionsRoutes = require('./routes/components/fiveWQuestions.routes');
// const generalKnowledgeRoutes = require('./routes/components/generalKnowledge.routes');
// const learningOutcomeRoutes = require('./routes/components/learningOutcome.routes');
// const activitiesHomeworkRoutes = require('./routes/components/activitiesHomework.routes');
// const evaluationRoutes = require('./routes/components/evaluation.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);
app.use('/api/lesson-plans', lessonPlanRoutes);
// Map each route to its respective component
app.use('/api/physical-activities', physicalActivityRoutes);
// app.use('/api/motivations', motivationRoutes);
// app.use('/api/teaching-aid-others', teachingAidOthersRoutes);
// app.use('/api/stem', stemRoutes);
// app.use('/api/vocabulary', vocabularyRoutes);
// app.use('/api/five-w-questions', fiveWQuestionsRoutes);
// app.use('/api/general-knowledge', generalKnowledgeRoutes);
// app.use('/api/learning-outcomes', learningOutcomeRoutes);
// app.use('/api/activities-homework', activitiesHomeworkRoutes);
// app.use('/api/evaluation', evaluationRoutes);

// Start server
createDatabase()
  .then(() => {
    db.sequelize.sync().then(() => {
      console.log('Database synchronized successfully.');
      initializeRoles();
    });

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => console.error('Error initializing the server:', err.message));

  // Error handling middleware (must be last)
  app.use(errorHandler);
