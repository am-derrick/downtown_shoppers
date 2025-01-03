import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    href,
    className = '',
    ...props 
}) => {
    const baseStyles = [
        "font-gotham",
        "rounded-full",
        "transition-all duration-200",
        "inline-flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-offset-2"
    ].join(' ');
    
    const variants = {
        primary: "bg-black text-white hover:bg-neutral-900 focus:ring-black/20",
        secondary: "border-2 border-black text-black hover:bg-black hover:text-white",
        minimal: "text-neutral-600 hover:text-black hover:bg-neutral-50"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    if (href) {
        return (
            <Link to={href} className={buttonClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;