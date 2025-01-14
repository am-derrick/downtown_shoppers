import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuoteLoading = () => {
    const [dots, setDots] = useState('');
    const [waitTime, setWaitTime] = useState(0);

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        const waitInterval = setInterval(() => {
            setWaitTime(prev => prev + 1);
        }, 60000); // Increment wait time every minute

        return () => {
            clearInterval(dotsInterval);
            clearInterval(waitInterval);
        };
    }, []);

    // Update the wait time message based on duration
    const getWaitMessage = () => {
        if (waitTime < 1) return "This usually takes about 5-10 minutes.";
        if (waitTime < 5) return `You've been waiting for ${waitTime} minute${waitTime === 1 ? '' : 's'}. Please continue to wait.`;
        return "We're taking longer than usual. Please continue to wait or contact support if needed.";
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <div className="text-center">
                    <div className="mb-6">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto"></div>
                    </div>
                    <h2 className="text-2xl font-light mb-4">Processing Your Quote{dots}</h2>
                    <p className="text-gray-600 mb-6">Please wait while we review your shopping list and prepare your quote.</p>
                    
                    <div className="space-y-4 max-w-md mx-auto">
                        <div className="bg-gray-50 p-4 rounded-lg text-left">
                            <h3 className="font-medium mb-2">What's happening now:</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                    List submitted successfully
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                    Our team is reviewing your items
                                </li>
                                <li className="flex items-center opacity-50">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                                    Preparing your quote
                                </li>
                            </ul>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                            {getWaitMessage()} You'll be automatically redirected when your quote is ready.
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default QuoteLoading;
