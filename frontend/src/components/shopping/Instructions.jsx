import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Image as ImageIcon, ListChecks, Clock } from 'lucide-react';

const Instructions = () => {
    const tips = [
        {
            icon: ListChecks,
            title: 'Be Specific',
            description: 'Include brand preferences, sizes, and any specific requirements for each item.'
        },
        {
            icon: ImageIcon,
            title: 'Add Images',
            description: 'Upload product images to ensure we get exactly what you need.'
        },
        {
            icon: Clock,
            title: 'Processing Time',
            description: 'Lists are typically processed within 2-3 hours during business hours.'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
        >
            {/* Info Header */}
            <div className="flex items-start space-x-3 mb-6">
                <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-lg font-medium mb-1">Shopping List Tips</h3>
                    <p className="text-gray-600 text-sm">
                        Follow these guidelines to help us serve you better
                    </p>
                </div>
            </div>

            {/* Tips List */}
            <div className="space-y-6">
                {tips.map((tip, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                    >
                        <tip.icon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                                {tip.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {tip.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Need Help?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                    Our support team is available to assist you with your shopping list. Contact us via:
                </p>
                <ol>
                    <li>
                    <Link to='https://wa.me/256766531370'>
                        <button className="text-sm text-yellow-500 hover:text-yellow-600 font-medium">
                            ☙ WhatsApp
                        </button>
                    </Link>
                    </li>
                    <li>
                    <Link to='mailto:downtownshopping3@gmail.com'>
                        <button className="text-sm text-yellow-500 hover:text-yellow-600 font-medium">
                            ☙ Email
                        </button>
                    </Link>
                    </li>
                </ol>
                
            </div>
        </motion.div>
    );
};

export default Instructions;