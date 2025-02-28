const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3002; // Server runs on port 3002

app.use(express.json()); // Ensure JSON parsing is enabled
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

const dataFilePath = path.join(__dirname, 'data.json');

// Temporary storage for logged-in user
let loggedInUserId = null;

// Helper function to read data from JSON file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([])); // Create file if it doesn't exist
  }
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading data.json:', error);
    return [];
  }
};

// Helper function to write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error writing to data.json:', error);
  }
};

// Routes
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'register.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'dashboard.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'profile.html')));

// Handle registration
app.post('/register', (req, res) => {
  console.log('Registering user:', req.body);
  const { idNumber, firstName, middleInitial, lastName, email, year, course, password } = req.body;

  if (!idNumber || !firstName || !lastName || !email || !year || !course || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let users = readData();

  // Ensure idNumber is treated as a string for comparison
  if (users.some(user => String(user.idNumber) === String(idNumber))) {
    return res.status(400).json({ message: 'User with this ID already exists' });
  }

  const newUser = {
    idNumber: String(idNumber).trim(),
    firstName: firstName.trim(),
    middleInitial: middleInitial ? middleInitial.trim() : '', 
    lastName: lastName.trim(),
    email: email.trim(),
    year: String(year).trim(),
    course: course.trim(),
    password: password.trim(),
    profilePhoto: null  // Ensure profile photo field exists
  };

  users.push(newUser);

  try {
    writeData(users);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error writing data:', error);
    res.status(500).json({ message: 'Error saving user' });
  }
});

// Handle user login
app.post('/login', (req, res) => {
  console.log('Login attempt received:', req.body); // Log received data

  const { identifier, password } = req.body;  // Match frontend variable names

  // Default admin credentials
  const defaultAdminUsername = 'admin';
  const defaultAdminPassword = 'users';

  if (identifier === defaultAdminUsername && password === defaultAdminPassword) {
    return res.json({ message: 'Login successful', redirect: '/admin-dashboard/dist2/admin.html' });
  }

  let users = readData(); // Read user data from JSON file
  console.log('Users from database:', users); // Log all users

  if (!users || users.length === 0) {
      console.error('No user data found!');
      return res.status(500).json({ message: 'Server error: No user data found' });
  }

  // Fix: Ensure the backend checks for `idNumber` (matching `data.json`)
  const user = users.find(user => String(user.idNumber).trim() === String(identifier).trim() 
      && user.password === password);

  if (user) {
      console.log('Login successful for:', user.idNumber);
      loggedInUserId = user.idNumber; // Store logged-in user's ID
      return res.json({ message: 'Login successful', redirect: '/dashboard.html' });
  } else {
      console.warn('Invalid login attempt for:', identifier);
      return res.status(401).json({ message: 'Invalid ID Number or Password' });
  }
});

// Get logged-in user profile
app.get('/get-profile', (req, res) => {
  if (!loggedInUserId) {
    return res.status(401).json({ message: 'No user is logged in' });
  }

  let users = readData();
  const user = users.find(user => user.idNumber === loggedInUserId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Update profile
app.post('/update-profile', (req, res) => {
  if (!loggedInUserId) {
    return res.status(401).json({ message: 'No user is logged in' });
  }

  let users = readData();
  const userIndex = users.findIndex(user => user.idNumber === loggedInUserId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = { ...users[userIndex], ...req.body };
  writeData(users);
  res.status(200).json({ message: 'Profile updated successfully' });
});

// Handle logout
app.post('/logout', (req, res) => {
  loggedInUserId = null;
  res.status(200).json({ message: 'Logout successful' });
});

// Serve static files from the dist2 directory for admin
app.use('/admin-dashboard/dist2', express.static(path.join(__dirname, '..', 'admin-dashboard', 'dist2')));

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
