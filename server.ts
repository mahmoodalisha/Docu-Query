require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const { CohereClient } = require('cohere-ai');
const cors = require('cors');

console.log('Cohere API Key:', process.env.COHERE_API_KEY);

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Add Cache-Control middleware
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Serve static files from frontend build
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

// Test route
app.get("/test", (req, res) => {
  res.send("Express app is running");
});

// Initialize Cohere Client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid collisions
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const pdfPath = path.join(__dirname, 'uploads', req.file.filename);
  
  fs.stat(pdfPath, (err, stats) => {
    if (err) {
      console.error('File save error:', err);
      return res.status(500).json({ error: 'Failed to save file' });
    }
    
    res.json({ pdfId: req.file.filename });
  });
});

// Query Cohere API with PDF content
app.post('/ask', async (req, res) => {
  const { pdfId, question } = req.body;
  const pdfPath = path.join(__dirname, 'uploads', pdfId);

  if (!fs.existsSync(pdfPath)) {
    return res.status(404).send('PDF not found');
  }

  try {
    // Extract text from PDF
    const pdfData = fs.readFileSync(pdfPath);
    const data = await pdf(pdfData);
    const pdfContent = data.text;

    // Query Cohere Chat API
    const response = await cohere.chat({
      message: `Context: ${pdfContent}\n\nQuestion: ${question}\n\nAnswer:`,
    });

    const answer = response.text.trim();
    res.json({ answer });
  } catch (error) {
    console.error('Error processing the query:', error.response ? error.response.data : error.message);
    res.status(500).send('Error processing the query');
  }
});

// Serve uploaded files
app.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Frontend routing (catch-all for frontend paths)
app.get('*', (req, res) => {
  try {
    res.sendFile(
      path.resolve(__dirname, 'frontend', 'build', 'index.html'),
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
