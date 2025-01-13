import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const navigation = {
        main: [
            { label: 'How It Works', path: '/how-it-works' },
            { label: 'Services', path: '/#services' },
            { label: 'About', path: '/about' }
        ],
        actions: [
            {
                icon: Search, 
                label: 'Search', 
                action: () => console.log('Search clicked') 
            },
            { 
                icon: User, 
                label: 'Account', 
                path: '/#account' 
              },
              { 
                icon: Heart, 
                label: 'Wishlist', 
                path: '/#wishlist' 
              }
        ]
    };

    // Scroll behaviour for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/80 backdrop-blur-md shadow-sm' 
              : 'bg-white'
          }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo and main navigation */}
                    <div className="flex items-center space-x-12">
                        {/* Logo */}
                        <Logo size="md" />

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navigation.main.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Action Items */}
                    <div className="flex items-center space-x-6">
                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navigation.actions.map((item, index) => {
                                const Icon = item.icon;
                                return item.path ? (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className="text-gray-400 hover:text-black transition-colors duration-200"
                                    aria-label={item.label}
                                >
                                    <Icon className="w-5 h-5" />
                                </Link> 
                            ) : (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="text-gray-400 hover:text-black transition-colors duration-200"
                                    aria-label={item.label}
                                >
                                    <Icon className="w-5 h-5" />
                                </button> 
                            );
                        })}
                        </div>

                        {/* CTA Button */}
                        <Button 
                            href="/shopping" 
                            variant="primary"
                            size="md"
                            className="hidden md:block"
                        >
                            Start Shopping
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex flex-col space-y-4">
                            {navigation.main.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-base text-gray-600 hover:text-black transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button 
                                href="/start-shopping" 
                                variant="primary"
                                size="md"
                                fullWidth={true}
                                className="mt-4"
                            >
                                Start Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;