require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');
const { CohereClient } = require('cohere-ai');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pdf_uploads',
    resource_type: 'raw',
    allowed_formats: ['pdf'],
    public_id: (req, file) => `${Date.now()}-${path.parse(file.originalname).name}`,
  },
});

const upload = multer({ storage, limits: { fileSize: 40 * 1024 * 1024 } });


const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

app.use(express.json());
app.use(cors({ origin: '*' }));


app.get('/test', (req, res) => res.send('Backend running 🚀'));


app.post('/upload', upload.single('file'), (req, res) => {
  try {
    
    const pdfUrl = cloudinary.url(req.file.filename, { resource_type: 'raw', secure: true });
    const publicId = req.file.filename;
    res.json({ pdfUrl, publicId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'File upload failed' });
  }
});


app.post('/ask', async (req, res) => {
  const { pdfUrl, question } = req.body;

  if (!pdfUrl) return res.status(400).send('No PDF URL provided');

  try {
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
    const data = await pdf(Buffer.from(response.data));
    const pdfContent = data.text;

    
    const cohereResponse = await cohere.chat({
      message: `Context: ${pdfContent}\n\nQuestion: ${question}\n\nAnswer:`,
    });

    res.json({ answer: cohereResponse.text.trim() });
  } catch (err) {
    console.error('Error processing query:', err.message);
    res.status(500).send('Error processing the query');
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
