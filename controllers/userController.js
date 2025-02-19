const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer();

exports.registerUser = (req, res) => {
  const { name, nrp, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to hash password' });
    }
    db.query('INSERT INTO users (name, nrp, password, role) VALUES (?, ?, ?, ?)', [name, nrp, hashedPassword, role], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.loginUser = [upload.none(), (req, res) => {
  const { nrp, password } = req.body;
  db.query('SELECT * FROM users WHERE nrp = ?', [nrp], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
      res.json({ token });
    });
  });
}];
