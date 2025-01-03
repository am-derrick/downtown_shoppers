import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import shopperMan from '../../assets/images/shopping_man_1.png';
import deliveryMan from '../../assets/images/delivery_man.png';
import cyclerMan from '../../assets/images/cycler_man.png'

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            image: shopperMan,
            titleParts: {
                start: "Your Personal",
                highlighted: "Shopping Assistant",
            },
            description: "Submit your shopping list, and let our expert shoppers handle the rest."
        },
        {
            image: deliveryMan,
            titleParts: {
                start: "Fast &",
                highlighted: "Reliable Delivery",
            },
            description: "We carefully select and deliver quality products to your doorstep."
        },
        {
            image: cyclerMan,
            titleParts: {
                start: "Professional",
                highlighted: "Service",
            },
            description: "Our experienced shoppers ensure you get exactly what you need."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        // Add a gradient background container
        <div className="relative overflow-hidden min-h-screen">
            {/* Primary gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-green-50 to-white">
                {/* Subtle color overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                
                {/* Subtle animated gradient for dynamism */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-green-400/5 animate-gradient" />
            </div>

            {/* Very subtle pattern for texture */}
            <div 
                className="absolute inset-0 opacity-[0.02]" 
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
                    backgroundSize: '44px 44px'
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 min-h-[80vh] items-center overflow-hidden">
                    {/* Text Content */}
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 space-y-6"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                                {/* First part of the title */}
                                <span className="block text-gray-800 mb-2">
                                    {slides[currentSlide].titleParts.start}
                                </span>
                                {/* Highlighted part with gradient */}
                                <span className="block bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent pb-1">
                                    {slides[currentSlide].titleParts.highlighted}
                                </span>
                            </h1>
                            
                            <p className="text-gray-600 text-lg md:text-xl max-w-lg">
                                {slides[currentSlide].description}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-green-400 text-white rounded-full hover:shadow-lg transition-all duration-300"
                                >
                                    Start Shopping
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3 border-2 border-yellow-400/50 text-gray-700 rounded-full hover:border-green-400/50 transition-all duration-300"
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Image Section */}
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <img
                                src={slides[currentSlide].image}
                                alt="Shopping experience"
                                className="w-full h-auto max-w-none md:max-w-[150%] lg:max-w-[180%] xl:max-w-[200%] md:-mr-20 lg:-mr-32 xl:-mr-40 transform md:translate-x-0 lg:translate-x-0 xl:translate-x-0"
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center right'
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Hero;