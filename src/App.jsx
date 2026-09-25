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

import FloatingLines from './components/FloatingLines';
import CursorGrid from './components/CursorGrid';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
      <main className="app-shell" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* React Bits: FloatingLines Interactive Wave Background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.85, pointerEvents: 'none' }}>
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[12, 16, 22]}
            lineDistance={[7, 5, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            parallaxStrength={0.25}
            animationSpeed={0.8}
            linesGradient={["#e11d48", "#38bdf8", "#6366f1", "#0284c7"]}
            mixBlendMode="screen"
            backgroundColor="#0b0f19"
          />
        </div>

        {/* React Bits: Interactive Cursor Grid on hover/click */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <CursorGrid
            cellSize={60}
            color="#38bdf8"
            radius={150}
            falloff="smooth"
            holdTime={300}
            fadeDuration={600}
            lineWidth={1.1}
            maxOpacity={0.35}
            fillOpacity={0.05}
            gridOpacity={0.02}
            cellRadius={4}
            clickPulse={true}
            pulseSpeed={700}
          />
        </div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Navigation theme={theme} toggleTheme={toggleTheme} />

          <Routes>
            <Route path="/login" element={<PublicRoute><Auth /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
            <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
            <Route path="/architecture" element={<ProtectedRoute><InfoPage /></ProtectedRoute>} />
          </Routes>
          
          <footer style={{ position: 'relative', zIndex: 10, marginTop: '40px' }}>
            CardioCare · For educational use only · Not a substitute for medical advice
          </footer>
        </div>
      </main>
    </BrowserRouter>
  );
}
