const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Daisuke:1234567890@cluster1.0u47xl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  
})
.then(() => console.log(' Connected to MongoDB'))
.catch((err) => console.error(' MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

const ProgressSchema = new mongoose.Schema({
  userId: String,
  progress: Object,
  scores: Object,
  timestamp: { type: Date, default: Date.now }
});

const Progress = mongoose.model('Progress', ProgressSchema);

app.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/sync', async (req, res) => {
  const { userId, progress, scores, timestamp } = req.body;
  if (!userId || !progress || !scores) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    await Progress.findOneAndUpdate(
      { userId },
      { progress, scores, timestamp: timestamp || new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err });
  }
});

app.get('/progress', async (req, res) => {
  try {
    const allProgress = await Progress.find();
    res.json(allProgress);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err });
  }
});

app.post('/feedback', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    console.log('Feedback received:', { name, email, message });
    res.json({ success: true, message: 'Feedback received. Thank you!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
