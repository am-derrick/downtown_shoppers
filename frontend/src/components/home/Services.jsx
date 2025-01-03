import React from 'react';
import { motion } from 'framer-motion';

import personalShopping from '../../assets/images/personal_shopper.jpeg';
import corporateShopping from '../../assets/images/corporate_services.jpg';
import giftShopping from '../../assets/images/gift_shopping.jpg';

const Services = () => {
    const services = [
        {
            image: personalShopping,
            title: 'Personal Shopping',
            description: 'Customized shopping experience with dedicated personal shoppers',
            features: ['Item selection', 'Affordable prices', 'Quality check']
        },
        {
            image: corporateShopping,
            title: 'Corporate Services',
            description: 'Bulk ordering and regular supply management for businesses',
            features: ['Bulk orders', 'Regular scheduling', 'Convinient communication']
        },
        {
            image: giftShopping,
            title: 'Gift Shopping',
            description: 'Let us handle your gift shopping and wrapping needs',
            features: ['Gift selection', 'Premium wrapping', 'Occasion reminders']
        }
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-light mb-4"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Tailored solutions for all your shopping needs
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-xl mb-6">
                                <img 
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;