import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, MapPin, Bell } from 'lucide-react';

const Account = () => {
    const sections = [
        {
            title: 'Personal Information',
            icon: User,
            content: {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890'
            }
        },
        {
            title: 'Order History',
            icon: ShoppingBag,
            orders: [
                // Order history data
            ]
        },
        {
            title: 'Saved Addresses',
            icon: MapPin,
            addresses: [
                // Address data
            ]
        },
        {
            title: 'Notifications',
            icon: Bell,
            preferences: {
                orderUpdates: true,
                promotions: false,
                newsletter: true
            }
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* Navigation Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {sections.map((section, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <section.icon className="w-5 h-5 text-gray-400" />
                                <span>{section.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {/* Content will change based on selected section */}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Account;