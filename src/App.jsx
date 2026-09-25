import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Heart, Activity } from 'lucide-react';

import Auth from './pages/Auth';
import Assessment from './pages/Assessment';
import InfoPage from './pages/Info';
import Overview from './pages/Overview';
import Insights from './pages/Insights';

function Navigation({ theme, toggleTheme }) {
  const location = useLocation();
  const userName = localStorage.getItem('user_name');
  
  if (!userName) return null;

  return (
    <div className="nav-container">
      <nav className="nav-wrap">
        <Link to="/" className="brand">
          <div className="brand-mark"><Heart size={16} fill="white" strokeWidth={0} /></div>
          Cardio<span>Care</span>
          <span className="ai-badge">AI V1.1</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? "nav-link active" : "nav-link"}>Overview</Link>
          <Link to="/assessment" className={location.pathname === '/assessment' ? "nav-link active" : "nav-link"}>Risk Engine</Link>
          <Link to="/insights" className={location.pathname === '/insights' ? "nav-link active" : "nav-link"}>Insights</Link>
          <Link to="/architecture" className={location.pathname === '/architecture' ? "nav-link active" : "nav-link"}>Architecture</Link>
        </div>

        <div className="nav-controls">
          <div className="status-badge">
            <div className="status-dot" /> Online
          </div>
          <Link to="/assessment" className="btn-assess">
            <Activity size={16} /> Assess Risk
          </Link>
        </div>
      </nav>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
      <main className="app-shell">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        
        <Navigation theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/login" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/architecture" element={<ProtectedRoute><InfoPage /></ProtectedRoute>} />
        </Routes>
        
        <footer style={{position: 'relative', zIndex: 10, marginTop: '40px'}}>
          CardioCare · For educational use only · Not a substitute for medical advice
        </footer>
      </main>
    </BrowserRouter>
  );
}
