import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import MacDock from './components/MacDock';
import Home from './pages/Home';
import Features from './pages/Features';
import Sectors from './pages/Sectors';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RecentHelps from './pages/RecentHelps';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recent-helps" element={<RecentHelps />} />
        </Routes>
        <MacDock />
      </div>
    </Router>
  );
}
