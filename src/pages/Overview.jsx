import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoldText from '../components/FoldText';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Overview() {
  return (
    <div className="main-container" style={{ maxWidth: '1000px', marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* React Bits: FoldText Animated Headline */}
      <motion.div style={{ textAlign: 'center', marginBottom: '36px' }} {...fadeTransition}>
        <FoldText
          text="Clinical Intelligence Unfolds"
          splitBy="char"
          hinge="top"
          trigger="mount"
          duration={0.7}
          stagger={0.03}
          ease="power3.out"
          perspective={800}
          creaseShading={0.6}
          fontSize="clamp(2rem, 5vw, 3.4rem)"
          fontWeight={800}
          color="#ffffff"
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '12px', maxWidth: '640px', marginInline: 'auto', lineHeight: '1.6' }}>
          Real-time in-memory cardiovascular evaluation powered by production-grade clinical machine learning.
        </p>
      </motion.div>

      <motion.div 
        style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}
        {...fadeTransition}
      >
        <Link 
          to="/assessment" 
          style={{
            background: 'linear-gradient(90deg, #38bdf8, #2563eb)',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 32px',
            borderRadius: '999px',
            fontWeight: '600',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
            transition: 'transform 0.2s'
          }}
        >
          Launch Risk Engine <ArrowRight size={16} />
        </Link>

        <Link 
          to="/architecture" 
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#e2e8f0',
            textDecoration: 'none',
            padding: '16px 32px',
            borderRadius: '999px',
            fontWeight: '500',
            fontSize: '15px',
            backdropFilter: 'blur(10px)',
            transition: 'background 0.2s'
          }}
        >
          Clinical Architecture
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ width: '100%', maxWidth: '800px', marginBottom: '50px', position: 'relative' }}
      >
        <svg viewBox="0 0 800 60" style={{ width: '100%', height: '60px', overflow: 'visible' }}>
          <path 
            d="M0,30 L250,30 L260,10 L275,55 L290,15 L300,30 L450,30 L460,10 L475,55 L490,15 L500,30 L800,30" 
            fill="none" 
            stroke="#e11d48" 
            strokeWidth="2" 
            style={{ filter: 'drop-shadow(0 0 6px #e11d48)' }} 
          />
          <text x="520" y="25" fill="#e11d48" fontSize="12" style={{ filter: 'drop-shadow(0 0 4px #e11d48)', letterSpacing: '1px' }}>
            Real-Time In-Memory Evaluation
          </text>
        </svg>
      </motion.div>

      <motion.div 
        className="glass-card" 
        style={{ padding: '0', overflow: 'hidden', borderRadius: '24px', width: '100%', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <img 
          src="/ai-heart.jpg" 
          alt="AI Cardiovascular Visualization" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </motion.div>

      <motion.div 
        className="form-grid" 
        style={{ marginTop: '40px', width: '100%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '8px' }}>Risk Engine</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Enter patient vitals and lifestyle indicators to get an instant probability score using our Logistic Regression model.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '8px' }}>Account Settings</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Manage your session and log out of the platform securely.
          </p>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user_name');
              window.location.href = '/login';
            }} 
            className="btn-secondary" 
            style={{ display: 'inline-flex', padding: 0, color: '#e11d48' }}
          >
            Log out now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
