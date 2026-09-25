import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { HeartPulse, Moon, Sun, Info } from 'lucide-react';

import Auth from './pages/Auth';
import Assessment from './pages/Assessment';
import InfoPage from './pages/Info';

function Navigation({ theme, toggleTheme }) {
  const location = useLocation();
  const userName = localStorage.getItem('user_name');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    window.location.href = '/';
  };

  return (
    <nav className="nav-wrap">
      <Link to="/" className="brand">
        <div className="brand-mark"><HeartPulse size={18} strokeWidth={2.5} /></div>
        Cardio<span>Sight</span>
      </Link>
      <div className="nav-controls">
        {userName && (
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginRight: '8px' }}>
            Hi, {userName}
          </span>
        )}
        {location.pathname !== '/info' && (
          <Link to="/info" className="theme-toggle" aria-label="Information">
            <Info size={18} />
          </Link>
        )}
        {location.pathname === '/info' && (
          <Link to="/assessment" className="theme-toggle" aria-label="Assessment" style={{width: 'auto', padding: '0 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold'}}>
            Assess Risk
          </Link>
        )}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {userName && (
          <button className="theme-toggle" onClick={handleLogout} aria-label="Logout" style={{width: 'auto', padding: '0 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', marginLeft: '4px'}}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;
  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/assessment" replace />;
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
          <Route path="/" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
        
        <footer style={{position: 'relative', zIndex: 10}}>CardioSight · For educational use only · Not a substitute for medical advice</footer>
      </main>
    </BrowserRouter>
  );
}
