import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Features from '../components/home/Features';
import Services from '../components/home/Services';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Services />
            <Categories />
            <Footer />
        </div>
    );
};

export default Home;