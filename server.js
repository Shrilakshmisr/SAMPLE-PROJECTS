const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes'); // ✅ fixed

const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/user', userRoutes); // ✅ Connects backend to /user/signup etc.

// Redirect root to signup page
app.get('/', (req, res) => {
  res.redirect('/Signup/signup.html'); // ✅ Working file
});

// Start server after DB sync
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});

