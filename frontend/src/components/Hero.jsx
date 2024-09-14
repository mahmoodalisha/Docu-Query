import React, { useEffect, useState } from 'react';
import './Hero.css'; 

const Hero = () => {
  const [showSections, setShowSections] = useState({
    keyFeatures: false,
    howItWorks: false,
    gettingStarted: false,
    faqs: false,
    feedback: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['keyFeatures', 'howItWorks', 'gettingStarted', 'faqs', 'feedback'];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
          setShowSections(prev => ({ ...prev, [section]: true }));
        } else {
          setShowSections(prev => ({ ...prev, [section]: false }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hero-container">
      <div id="keyFeatures" className={`section ${showSections.keyFeatures ? 'show' : 'hide'} left`}>
        <h2>Key Features</h2>
        <ul>
          <li>Instant Answers from PDFs: Upload your PDF, and the bot will understand and answer any questions related to the content inside.</li>
          <li>Simple to Use: Just upload your document, type your question, and the bot will provide you with the relevant information from the PDF.</li>
          <li>Multiple Formats Supported: You can upload PDFs from books, research papers, articles, contracts, and more.</li>
          <li>Continuous Learning: The more questions you ask, the better the bot gets at understanding your needs!</li>
        </ul>
      </div>

      <div id="howItWorks" className={`section ${showSections.howItWorks ? 'show' : 'hide'} right`}>
        <h2>How It Works</h2>
        <ul>
          <li>Upload Your PDF: Click on the "Upload" button to select a PDF document from your device.</li>
          <li>Ask Questions: Once the PDF is uploaded, simply type in your question in the chatbox. The bot will read the document and respond with accurate answers.</li>
          <li>Real-time Responses: Get instant answers without the need to search through pages of text.</li>
          <li>Refined Queries: Not getting the exact answer you want? Ask follow-up questions, and the bot will narrow down the response to exactly what you’re looking for.</li>
        </ul>
      </div>

      <div id="gettingStarted" className={`section ${showSections.gettingStarted ? 'show' : 'hide'} left`}>
        <h2>Getting Started</h2>
        <ul>
          <li>Step 1: Upload your PDF using the "Upload" button.</li>
          <li>Step 2: Ask any question related to the document.</li>
          <li>Step 3: Receive an instant, concise answer based on the content of your PDF.</li>
        </ul>
      </div>

      <div id="faqs" className={`section ${showSections.faqs ? 'show' : 'hide'} right`}>
        <h2>FAQs</h2>
        <ul>
          <li><strong>Q: Can the bot handle multiple PDFs at once?</strong> A: Currently, you can upload one PDF at a time, but feel free to ask as many questions as you need from that document.</li>
          <li><strong>Q: What kind of PDFs work best?</strong> A: Text-based PDFs (e.g., eBooks, research papers) are ideal. Scanned documents might not work as well unless they contain clear text.</li>
          <li><strong>Q: Is my data secure?</strong> A: Yes! We prioritize your privacy. Your uploaded PDFs are only processed by the bot and are not shared or stored after your session ends.</li>
        </ul>
      </div>

      <div id="feedback" className={`section ${showSections.feedback ? 'show' : 'hide'} left`}>
        <h2>Feedback</h2>
        <p>We are constantly improving! If you encounter any issues or have suggestions, let us know through the feedback section.</p>
      </div>
    </div>
  );
};

export default Hero;
