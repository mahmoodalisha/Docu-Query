# DocuQuery

## DocuQuery is an application that allows users to upload PDF files and interact with a chatbot to ask questions about the content of the PDFs. The chatbot processes the PDF, extracts text, and uses Cohere's API to provide intelligent responses based on the content of the document.





https://github.com/user-attachments/assets/b218619e-e4bd-42a1-be1d-ae48ba9c6489

![Screenshot 2024-08-31 004422](https://github.com/user-attachments/assets/445b7740-5456-47cd-ae57-5daf1eead343)



Features
Upload PDFs: Users can upload PDF files for analysis.
Ask Questions: Interact with a chatbot to get answers based on the PDF content.
Text Extraction: Extracts and processes text from PDF documents.
Chat Integration: Uses Cohere's API for generating responses to user queries.
Technologies Used
Node.js - JavaScript runtime for building the server.
Express - Web framework for handling HTTP requests.
Multer - Middleware for handling file uploads.
PDF-Parse - Library for extracting text from PDF files.
Cohere-AI - API for generating conversational responses.
Cors - Middleware for enabling CORS.
Dotenv - For managing environment variables.
Installation
Clone the repository:


git clone https://github.com/mahmoodalisha/DocuQuery.git
Navigate to the project directory:


cd frontend
Install the dependencies:


npm install
Create a .env file in the root directory and add your Cohere API key:


COHERE_API_KEY=your-cohere-api-key
Start the server:


node server.ts
The server will run on http://localhost:5000.

Usage
Upload a PDF:

Send a POST request to /upload with the PDF file as form-data under the field file.
The response will include a pdfId which can be used to query the document.
Ask a Question:

Send a POST request to /ask with a JSON body containing pdfId and question.
Example request body:
json

{
  "pdfId": "example.pdf",
  "question": "What is the main topic of this document?"
}
The response will include the chatbot's answer.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or feedback, please reach out to Your Name.

Feel free to adjust any sections or add additional information specific to your project!
