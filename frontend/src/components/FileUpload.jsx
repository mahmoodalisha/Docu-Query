import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onFileUpload(response.data);
      setFileUrl(`http://localhost:5000/files/${response.data.pdfId}`); 
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose File
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          className="file-input"
          onChange={handleFileChange}
        />
      </label>
      <button className="upload-button" onClick={handleFileUpload}>Upload</button>
      {fileUrl && (
        <div className="view-link">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
