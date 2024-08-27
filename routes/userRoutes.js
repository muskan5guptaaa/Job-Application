const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('resume'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const resume = req.file.path;

    const newUser = new User({ name, email, resume });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

module.exports = router;
