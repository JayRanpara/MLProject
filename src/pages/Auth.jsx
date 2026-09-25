import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, UserPlus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, error
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      // Save user to localStorage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user_name', data.user_name);
      
      setStatus('idle');
      window.location.href = '/assessment';

    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message === 'Failed to fetch' ? 'Unable to connect to server' : err.message);
    }
  };

  return (
    <div className="main-container" style={{ maxWidth: '440px', marginTop: '60px' }}>
      <motion.div className="glass-card" {...fadeTransition}>
        <div className="wizard-header" style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to your account to continue' : 'Sign up to start your health assessment'}</p>
        </div>

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="error-message" 
            style={{ 
              background: 'var(--risk-high-bg)', 
              color: 'var(--risk-high)', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <AlertCircle size={18} /> {errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div className="input-field">
              <label>Full Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>
          )}
          
          <div className="input-field">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
              <input 
                type="email" 
                name="email" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="input-field">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleInputChange}
                required 
                minLength={6}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={status === 'loading'}
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
          >
            {status === 'loading' ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')} 
            {status !== 'loading' && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
            }}
            style={{ margin: '0 auto', fontSize: '14px' }}
          >
            {isLogin ? (
              <><UserPlus size={16}/> Need an account? Sign up</>
            ) : (
              <><Lock size={16}/> Already have an account? Sign in</>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
