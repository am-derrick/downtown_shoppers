import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Downtown_Shoppers_logo.png';

const Logo = ({ className = '' }) => {
    return (
        <Link 
            to="/" 
            className={`inline-block ${className}`}
            style={{ lineHeight: 0 }}
        >
            <img 
                src={logo} 
                alt="Downtown Shoppers" 
                className="w-[180px] md:w-[240px] h-auto transform-gpu" // Responsive sizing with hardware acceleration
                style={{
                    maxHeight: '80px',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                }}
            />
        </Link>
    );
};

export default Logo;