import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Downtown_Shoppers_logo.png';
import Button from '../common/Button';

const Navbar = () => {
  const navLinks = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' }
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Downtown Shoppers" 
                className="h-12 w-auto"
              />
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-600 hover:text-black transition-colors duration-200 text-sm font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Button
            href="/start-shopping"
            varaint="primary"
            size="md"
            >
                Start Shopping
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;