const User = require('../models/User');
const Student = require('../models/Student'); // Import the Student model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password} = req.body; // Add age and roomId if needed

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword });

    // After creating the user, create a new student entry
    const student = await Student.create({
      user_id: user._id, // Associate the student with the user
      name,
      email,
    });

    // Respond with a success message and user/student info
    // res.status(201).json({ message: 'User registered successfully', user, student });
        res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
