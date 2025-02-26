const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'dist')));

const dataFilePath = path.join(__dirname, 'data.json');

// Helper function to read data from JSON file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Route for root URL to redirect to register page
app.get('/', (req, res) => {
  console.log('Redirecting to /register');
  res.redirect('/register');
});

// Route for login page
app.get('/login', (req, res) => {
  console.log('Serving login page');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Route for register page
app.get('/register', (req, res) => {
  console.log('Serving register page');
  res.sendFile(path.join(__dirname, 'dist', 'register.html'));
});

// Route for dashboard page
app.get('/dashboard', (req, res) => {
  console.log('Serving dashboard page');
  res.sendFile(path.join(__dirname, 'dist', 'dashboard.html'));
});

// Route for profile page
app.get('/profile', (req, res) => {
  console.log('Serving profile page');
  res.sendFile(path.join(__dirname, 'dist', 'profile.html'));
});

// Route for announcements page
app.get('/announcements', (req, res) => {
  console.log('Serving announcements page');
  res.sendFile(path.join(__dirname, 'dist', 'announcements.html'));
});

// Route for lab rules page
app.get('/lab-rules', (req, res) => {
  console.log('Serving lab rules page');
  res.sendFile(path.join(__dirname, 'dist', 'lab-rules.html'));
});

// Route for sit-in history and feedback page
app.get('/sit-in-history', (req, res) => {
  console.log('Serving sit-in history and feedback page');
  res.sendFile(path.join(__dirname, 'dist', 'sit-in-history.html'));
});

// Route for reservation page
app.get('/reservation', (req, res) => {
  console.log('Serving reservation page');
  res.sendFile(path.join(__dirname, 'dist', 'reservation.html'));
});

// Handle registration form submission
app.post('/register', (req, res) => {
  console.log('Registering user:', req.body);
  const { idNumber, fullName, email, year, course, password } = req.body;
  const users = readData();
  const user = { idNumber, fullName, email, year, course, password };
  users.push(user);
  writeData(users);
  res.redirect('/login?message=Registration successful! Please log in.');
});

// Handle login form submission
app.post('/login', (req, res) => {
  console.log('Logging in user:', req.body);
  const { email, password } = req.body;
  const users = readData();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login?message=Invalid email or password');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});