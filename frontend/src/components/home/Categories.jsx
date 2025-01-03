import React from 'react';
import { motion } from 'framer-motion';

import pantryImage from '../../assets/images/product-images/pantry.jpg';
import cleaningImage from '../../assets/images/product-images/cleaning.jpg';
import cosmeticsImage from '../../assets/images/product-images/cosmetics.jpg';
import vegetablesImage from '../../assets/images/product-images/vegetables.jpg';
import decorImage from '../../assets/images/product-images/home_decor.jpg';
import toiletriesImage from '../../assets/images/product-images/toiletries.jpg';
import clothImage from '../../assets/images/product-images/child_clothes.jpg';
import electronicsImage from '../../assets/images/product-images/electronics.jpg';

const categories = [
    {
        title: 'Pantry Essentials',
        description: 'Stock up on everyday cooking necessities',
        image: pantryImage,
        link: '/category/pantry'
    },
    {
        title: 'Cleaning Supplies',
        description: 'Professional-grade cleaning products',
        image: cleaningImage,
        link: '/category/cleaning'
    },
    {
        title: 'Cosmetics',
        description: 'Beauty and personal care items',
        image: cosmeticsImage,
        link: '/category/cosmetics'
    },
    {
        title: 'Food Items',
        description: 'Fresh and packaged food products',
        image: vegetablesImage,
        link: '/category/food'
    },
    {
        title: 'Home Decor',
        description: 'Beautiful items for your living space',
        image: decorImage,
        link: '/category/decor'
    },
    {
        title: 'Toiletries',
        description: 'Personal hygiene and bathroom essentials',
        image: toiletriesImage,
        link: '/category/toiletries'
    },
    {
        title: 'Electronics',
        description: 'Gadgets and tech accessories',
        image: electronicsImage,
        link: '/category/electronics'
    },
    {
        title: 'Children Clothes',
        description: 'Any kind of clothes to suit your style',
        image: clothImage,
        link: '/category/pets'
    }
];

const CategoryCard = ({ category, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-medium mb-2">{category.title}</h3>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Categories = () => {
    return (
        <section className="pt-8 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light mb-4">Featured Categories</h2>
                    <p className="text-gray-600">Shop from any of our curated selection of quality products or any of your choice</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;