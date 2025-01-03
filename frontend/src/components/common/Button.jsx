import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href,
  className = '',
  ...props 
}) => {
  // Base styles that apply to all buttons
  const baseStyles = "rounded-full font-light transition-all duration-200";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "border border-black text-black hover:bg-black hover:text-white",
    outline: "border border-gray-200 text-gray-700 hover:border-gray-900",
    text: "text-gray-600 hover:text-black"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link 
        to={href}
        className={buttonClasses}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;