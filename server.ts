require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const { CohereClient } = require('cohere-ai');
const cors = require('cors');


const app = express();
const port = 5000;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

// Add Cache-Control middleware
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});


app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))

app.get("/test",(req,res)=>{
    res.send("Express app is running")
})

// Initialize Cohere Client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const pdfPath = path.join(__dirname, 'uploads', req.file.filename);
  res.json({ pdfId: req.file.filename });
});

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


app.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});



// Backend GET route
// app.get('/candidate/38', (req, res).....

// Looking for routes in frontend
app.get('*', (req, res)=>{
  try{
    res.sendFile(
      path.resolve(__dirname, 'frontend', 'build', 'index.html'),
      function (err) {
          if (err) {
              res.status(500).send(err)
          }
      }
  )
  }catch(err){
    res.status(500).send(err)
  }
}) // "/", "/login", "/register", "/home/score/3/edit/...."


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});