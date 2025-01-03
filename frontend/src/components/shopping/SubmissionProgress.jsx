import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader } from 'lucide-react';

const SubmissionProgress = ({ status, steps }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">
                    Submitting Your Shopping List
                </h3>
                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-3"
                        >
                            <div className={`
                                w-6 h-6 rounded-full flex items-center justify-center
                                ${status > index ? 'bg-green-500' : 
                                  status === index ? 'bg-yellow-400' : 
                                  'bg-gray-200'}
                            `}>
                                {status > index ? (
                                    <Check className="w-4 h-4 text-white" />
                                ) : status === index ? (
                                    <Loader className="w-4 h-4 text-white animate-spin" />
                                ) : null}
                            </div>
                            <span className={`text-sm ${
                                status >= index ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SubmissionProgress;