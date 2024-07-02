import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    
    <footer className="bg-gray-400 text-white py-8">
      <div className="container mx-auto items-center text-center">
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold ">Travel Planner</h5>
          <small className="mb-1 italic text-yellow-500 font-mono">Plan your trips with ease and joy.</small>
        </div>
        <div className=" text-center md:flex-row md:items-center mt-2 mb-2">
        <Link to="/#about-us" className="text-green-900 fLink px-3 py-2">About Us</Link>

          <a href="tel:+918976543210" className="text-green-900 fLink px-3 py-2">Contact</a>
          <Link to="/#privacy" className="text-green-900 fLink px-3 py-2">Privacy Policy</Link>
        </div>
        <small className='text-gray-600 font-extralight'>&copy; {currentYear} SHOBANA. All rights reserved.</small>

      </div>
    </footer>
  );
}

export default Footer;
