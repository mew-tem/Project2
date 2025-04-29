const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SpinSchema = new mongoose.Schema({
  outcome: String,
  isWin: Boolean,
  amount: Number,
  date: Date,
});
const Spin = mongoose.model('Spin', SpinSchema);

app.post('/api/history', async (req, res) => {
  const newSpin = new Spin(req.body);
  await newSpin.save();
  res.status(201).send('Saved');
});

app.get('/api/history', async (req, res) => {
  const spins = await Spin.find();
  res.json(spins);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));