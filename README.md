TVM SCHOOL

A simple Node.js application with JWT authentication, role-based access, and Sequelize ORM for managing users and roles.

Technologies Used
Node.js
Express.js
Sequelize (ORM)
JWT Authentication
MySQL
bcryptjs
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-project.git
Install dependencies:

bash
Copy code
npm install
Create a .env file and add the following:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=testdb
DB_PORT=3306
SECRET_KEY=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
PORT=8080
Start the server:

bash
Copy code
npm start
API Endpoints
POST /api/auth/signup: Register a new user
POST /api/auth/signin: User login
GET /api/test/all: Get all test data (Protected)
GET /app/users: Admin-only access to user data
