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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);
app.use('/api/lesson-plans', lessonPlanRoutes);

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
