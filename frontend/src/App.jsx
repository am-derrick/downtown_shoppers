import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import QuoteReview from './pages/QuoteReview';
import OrderConfirmation from './pages/OrderConfirmation';
import Account from './pages/Account';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/quote/:listId" element={<QuoteReview />} />
          <Route path="/order/confirm/:orderId" element={<OrderConfirmation />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;