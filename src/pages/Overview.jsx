import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Overview() {
  const userName = localStorage.getItem('user_name') || 'Guest';

  return (
    <div className="main-container" style={{ maxWidth: '900px', marginTop: '40px' }}>
      <motion.div className="wizard-header" {...fadeTransition}>
        <h1 style={{ fontSize: '42px', marginBottom: '16px' }}>
          Welcome to <span style={{ color: '#38bdf8' }}>CardioCare.</span>
        </h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Your intelligent, local clinical model for evaluating cardiovascular risk factors. 
          Hi {userName}, you are currently logged in and connected to AI V1.1.
        </p>
      </motion.div>

      <motion.div 
        className="form-grid" 
        style={{ marginTop: '40px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card" style={{ padding: '30px' }}>
          <Activity size={32} style={{ color: '#38bdf8', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>Risk Engine</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Enter patient vitals and lifestyle indicators to get an instant probability score using our Logistic Regression model.
          </p>
          <Link to="/assessment" className="btn-secondary" style={{ display: 'inline-flex', padding: 0 }}>
            Launch Engine →
          </Link>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <Database size={32} style={{ color: '#10b981', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>Architecture</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Learn about our training pipeline, the 72.7% accuracy score, and exactly which features power the predictions.
          </p>
          <Link to="/architecture" className="btn-secondary" style={{ display: 'inline-flex', padding: 0 }}>
            View Architecture →
          </Link>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <Zap size={32} style={{ color: '#a78bfa', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>Insights</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            View population statistics and feature correlations to understand what drives cardiovascular risk the most.
          </p>
          <Link to="/insights" className="btn-secondary" style={{ display: 'inline-flex', padding: 0 }}>
            Explore Insights →
          </Link>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <ShieldCheck size={32} style={{ color: '#e11d48', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>Account Settings</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Manage your session, toggle light/dark themes, and log out of the platform securely.
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
