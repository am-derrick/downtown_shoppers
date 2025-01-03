import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, Camera, Truck } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: ShoppingBag,
            title: 'Easy List Submission',
            description: 'Submit your shopping list in any format - text, images, or voice notes.'
        },
        {
            icon: Clock,
            title: 'Quick Response',
            description: 'Get a quote within hours and your items delivered when you need them.'
        },
        {
            icon: Camera,
            title: 'Image Search',
            description: 'Can\'t find the exact item? Share a photo and we\'ll source it for you.'
        },
        {
            icon: Truck,
            title: 'Reliable Delivery',
            description: 'Track your order in real-time and receive updates at every step.'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-yellow-50 to-green-50">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-light mb-4"
                    >
                        Why Choose Us
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Experience hassle-free shopping with our comprehensive services
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;