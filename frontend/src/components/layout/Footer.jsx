import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Footer = () => {
    return (
        <Footer className="bg-white border-t border-gray-100">
            <div className='max-w-7xl mx-auto px-6 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Company Info */}
                    <div className='space-y-4'>
                        <h3 className='font-light text-lg'>Downtown Shoppers</h3>
                        <p className='text-sm text-gray-500'>Shopping in good hands</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-light mb-4">Contact</h4>
                        <div className="space-y-2 text-sm text-gray-500">
                        <p>P.O. Box 1074, Kampala, Uganda</p>
                        <p>Namugongo Road</p>
                        <p>(+256) 758859166 / 788175627</p>
                        <p>lambano5gp@gmail.com</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-light mb-4">Quick Links</h4>
                        <div className="space-y-2 text-sm">
                        <Link to="/about" className="block text-gray-500 hover:text-black">About Us</Link>
                        <Link to="/services" className="block text-gray-500 hover:text-black">Services</Link>
                        <Link to="/faq" className="block text-gray-500 hover:text-black">FAQs</Link>
                        <Link to="/contact" className="block text-gray-500 hover:text-black">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Downtown Shoppers. All rights reserved.</p>
            </div>
        </Footer>
    );
};

export default Footer;