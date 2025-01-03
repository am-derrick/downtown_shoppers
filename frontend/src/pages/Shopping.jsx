import React from 'react';
import { motion } from 'framer-motion';
import ShoppingListForm from '../components/shopping/ShoppingListForm';
import Instructions from '../components/shopping/Instructions';

const Shopping = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-light mb-4 pt-12"
                    >
                        Create Your Shopping List
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Tell us what you need, and our expert shoppers will handle the rest. 
                        Add items, upload images, or provide specific instructions.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Shopping List Form */}
                    <div className="lg:col-span-2">
                        <ShoppingListForm />
                    </div>

                    {/* Instructions and Tips */}
                    <div className="lg:col-span-1">
                        <Instructions />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shopping;