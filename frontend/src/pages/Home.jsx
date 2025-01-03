import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Features from '../components/home/Features';
import Services from '../components/home/Services';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Services />
            <Categories />
        </div>
    );
};

export default Home;