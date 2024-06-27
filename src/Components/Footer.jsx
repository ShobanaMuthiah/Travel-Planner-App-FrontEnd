import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-400 text-white py-8">
      <div className="container mx-auto items-center text-center">
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-2">Travel Planner</h5>
          <p className="mb-2">Plan your trips with ease and joy.</p>
        </div>
        <div className=" text-center md:flex-row md:items-center mt-5 mb-2">
        <Link to="/#about-us" className="text-green-900 fLink px-3 py-2">About Us</Link>

          <Link to="#contact" className="text-green-900 fLink px-3 py-2">Contact</Link>
          <Link to="/#privacy" className="text-green-900 fLink px-3 py-2">Privacy Policy</Link>
        </div>
        <small>&copy; {currentYear} SHOBANA. All rights reserved.</small>

      </div>
    </footer>
  );
}

export default Footer;
