import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shopping from './pages/Shopping';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start-shopping" element={<Shopping />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;