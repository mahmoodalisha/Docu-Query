import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileUpload = (data) => {
    setPdfUrl(data.pdfUrl);
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <FileUpload onFileUpload={handleFileUpload} />
      {pdfUrl && <Chatbot pdfUrl={pdfUrl} />}
    </div>
  );
};

export default App;
