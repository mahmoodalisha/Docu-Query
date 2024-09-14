import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App = () => {
  const [pdfId, setPdfId] = useState(null);

  const handleFileUpload = (data) => {
    setPdfId(data.pdfId); 
  };

  return (
    <div>
      
      <Navbar />
      <Hero />
      <FileUpload onFileUpload={handleFileUpload} />
      {pdfId && <Chatbot pdfId={pdfId} />}
    </div>
  );
};

export default App;