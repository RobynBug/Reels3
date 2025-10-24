import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import History from './pages/History';
import Navbar from './components/Navbar';

function App() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserEmail(payload.email);
      } catch {
        setUserEmail('');
      }
    }
  }, []);

  return (
    <Router>
      <Navbar userEmail={userEmail} onLogout={() => setUserEmail('')} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth onAuth={(data) => setUserEmail(data.email)} />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
