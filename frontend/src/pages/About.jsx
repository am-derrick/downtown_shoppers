import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Clock, Check } from 'lucide-react';

const About = () => {
  const categories = [
    'Pantry Essentials',
    'Cleaning Supplies',
    'Cosmetics',
    'Food Items',
    'Home Decor',
    'Toiletries',
    'Electronics',
    'Children\'s Clothes'
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Focus on what matters while we handle your shopping needs'
    },
    {
      icon: ShoppingBag,
      title: 'Expert Shoppers',
      description: 'Our team carefully selects quality products for you'
    },
    {
      icon: Package,
      title: 'Door Delivery',
      description: 'Convenient delivery right to your doorstep'
    },
    {
      icon: Check,
      title: 'Quality Assured',
      description: 'We ensure all products meet high quality standards'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-light mb-6">About Downtown Shoppers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Save time today by delegating your shopping tasks to us. We're here to give you a convenient, 
            hassle-free shopping experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-light mb-6">What We Offer</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  <span className="text-gray-600">{category}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
    
  );
};

export default About;