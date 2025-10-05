import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ pdfUrl }) => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfUrl) {
      alert('Please upload a PDF first.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/ask`, {
        pdfUrl,
        question: message,
      });

      setResponses((prev) => [
        ...prev,
        { user: message, bot: response.data.answer },
      ]);

      setMessage('');
    } catch (error) {
      console.error('Chatbot query error:', error);
      setResponses((prev) => [
        ...prev,
        { user: message, bot: 'Error: Unable to process your request.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about your PDF"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <div>
        {responses.map((entry, index) => (
          <div key={index} className="chat-entry">
            <p><strong className="user">User:</strong> {entry.user}</p>
            <p><strong className="bot">Bot:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
