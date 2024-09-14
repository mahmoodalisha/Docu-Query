import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Welcome to the PDF Bot Assistant!</h1>
        <p className="navbar-description">
          This intelligent chatbot allows you to interact with your PDF documents in an entirely new way! Simply upload a PDF, and you can ask the bot questions directly from the content inside. Whether it's a research paper, a contract, or a manual, get the answers you need quickly and easily.
        </p>
      </div>
    </div>
  );
};

export default Navbar;
