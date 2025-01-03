import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Hello Downtown Shoppers</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;