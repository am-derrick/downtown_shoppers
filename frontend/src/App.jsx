import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import QuoteReview from './pages/QuoteReview';
import OrderConfirmation from './pages/OrderConfirmation';
import Account from './pages/Account';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/quote/:listId" element={<QuoteReview />} />
          <Route path="/order/confirm/:listId" element={<OrderConfirmation />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;