const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const { checkTextSafety } = require('./safety-check');

const app = express();

// Security middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control', 'no-store');
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoint
app.post('/api/check-safety', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ safe: false });
    }

    const { safe, result, reason } = await checkTextSafety(query);
    
    res.json({ 
      safe,
      result: safe ? result : null,
      reason
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ safe: false });
  }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));