import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../common/Logo';

const Footer = () => {
    const footerSections = {
        quickLinks: [
            { name: 'How It Works', path: '/how-it-works' },
            { name: 'Services', path: '/#services' },
            { name: 'About', path: '/about' },
            { name: 'Start Shopping', path: '/shopping' }
        ],
        contactInfo: [
            { 
                icon: MapPin, 
                info: 'P.O. Box 1074, Kampala, Uganda\nNamugongo Road' 
            },
            { 
                icon: Phone, 
                info: '+256 766531370',
                link: 'tel:+256766531370'
            },
            { 
                icon: Mail, 
                info: 'downtownshopping3@gmail.com',
                link: 'mailto:downtownshopping3@gmail.com'
            }
        ],
        socialLinks: [
            { 
                icon: Facebook, 
                name: 'Facebook',
                link: 'https://facebook.com/downtownshoppers',
                color: 'hover:bg-blue-50 hover:text-blue-600'
            },
            { 
                icon: Instagram, 
                name: 'Instagram',
                link: 'https://instagram.com/downtown.shoppers',
                color: 'hover:bg-pink-50 hover:text-pink-600'
            },
            { 
                icon: Twitter, 
                name: 'X',
                link: 'https://x.com/downtownshop',
                color: 'hover:bg-gray-50 hover:text-gray-900'
            },
            { 
                icon: FaWhatsapp, 
                name: 'WhatsApp',
                link: 'https://wa.me/256766531370',
                color: 'hover:bg-blue-50 hover:text-blue-700'
            }
        ]
    };

    return (
        <footer className="relative bg-white border-t border-gray-100">
            {/* Top gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link to="/" className="block">
                            <Logo size="lg" />
                        </Link>
                        <p className="text-gray-600 text-sm max-w-xs">
                            Your trusted personal shopping assistant. We make shopping hassle-free.
                        </p>
                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3">
                            {footerSections.socialLinks.map((social) => (
                                <a 
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerSections.quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="text-gray-600 hover:text-gray-900 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            {footerSections.contactInfo.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <item.icon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="ml-3">
                                        {item.link ? (
                                            <a 
                                                href={item.link}
                                                className="text-gray-600 hover:text-gray-900 text-sm"
                                            >
                                                {item.info}
                                            </a>
                                        ) : (
                                            <p className="text-gray-600 text-sm whitespace-pre-line">
                                                {item.info}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Downtown Shoppers. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-and-conditions" className="text-sm text-gray-500 hover:text-gray-900">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;