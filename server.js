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

app.use('/api/test', testRoutes);
app.use('/app', userRoutes);
app.use('/app', authRoutes);

// Ensure database exists and then start server
createDatabase().then(() => {
  // Sync Sequelize models (create tables if they don't exist)
  db.sequelize.sync().then(() => {
    console.log("Database & tables ensured.");
    initial(); // Insert default roles
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
function initial() {
  db.role
    .bulkCreate([
      { id: 1, name: "user" },
      { id: 2, name: "moderator" },
      { id: 3, name: "admin" },
    ])
    .then(() => console.log("Default roles created"))
    .catch((err) => console.log("Default roles creation error:", err.message));
}
