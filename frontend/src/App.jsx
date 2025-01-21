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
import Payment from './pages/Payment';
import PaymentSummary from './pages/PaymentSummary';
import OrderSuccess from './pages/OrderSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentCallback from './pages/PaymentCallback';
import OrderFailed from './pages/OrderFailed';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/quote/:listId" element={<QuoteReview />} />
          <Route path="/order/confirm/:listId" element={<OrderConfirmation />} />
          <Route path="/order/payment/:listId" element={<Payment />} />
          <Route path="/order/payment-summary/:listId" element={<PaymentSummary />} />
          <Route path="order/success/:listId" element={<OrderSuccess />} />
          <Route path="order/failed/:listId" element={<OrderFailed />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;