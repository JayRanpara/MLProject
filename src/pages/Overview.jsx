import { motion } from 'framer-motion';
import { ArrowRight, Activity, Award, Zap, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoldText from '../components/FoldText';
import FlipCard from '../components/FlipCard';

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
        style={{ width: '100%', maxWidth: '800px', marginBottom: '40px', position: 'relative' }}
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

      {/* React Bits: 3D Interactive FlipCards */}
      <motion.div 
        style={{ marginTop: '48px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Card 1: Risk Engine */}
        <FlipCard
          width={300}
          height={330}
          radius={20}
          background="rgba(18, 24, 38, 0.85)"
          glare={true}
          tilt={true}
          tiltMax={10}
          hoverScale={1.03}
          front={
            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', display: 'grid', placeItems: 'center' }}>
                    <Activity size={22} color="#38bdf8" />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                    Active AI
                  </span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>Risk Engine</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
                  Evaluate 11 clinical vitals to get real-time cardiovascular probability inference in under 5ms.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', opacity: 0.9 }}>
                <RotateCw size={13} /> Click or drag to inspect
              </div>
            </div>
          }
          back={
            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(145deg, rgba(22, 30, 48, 0.95), rgba(12, 17, 28, 0.98))' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Production Model
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '6px 0 10px', color: '#ffffff' }}>Logistic Regression</h3>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tested Accuracy</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8' }}>72.83%</div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.5' }}>
                  Normalized with standard scalers across 68k records.
                </p>
              </div>
              <Link to="/assessment" className="btn-primary" style={{ justifyContent: 'center', fontSize: '13px', padding: '10px 16px' }}>
                Start Assessment <ArrowRight size={15} />
              </Link>
            </div>
          }
        />

        {/* Card 2: Architecture & Benchmark */}
        <FlipCard
          width={300}
          height={330}
          radius={20}
          background="rgba(18, 24, 38, 0.85)"
          glare={true}
          tilt={true}
          tiltMax={10}
          hoverScale={1.03}
          front={
            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'grid', placeItems: 'center' }}>
                    <Award size={22} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                    6 Classifiers
                  </span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>Architecture</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
                  Multi-model benchmark comparing Random Forest, GBDT, Naive Bayes, KNN, and Decision Trees.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', opacity: 0.9 }}>
                <RotateCw size={13} /> Click or drag to inspect
              </div>
            </div>
          }
          back={
            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(145deg, rgba(22, 30, 48, 0.95), rgba(12, 17, 28, 0.98))' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Test Set Split
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '6px 0 10px', color: '#ffffff' }}>Validation Metrics</h3>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Top Benchmark ROC-AUC</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>80.08%</div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.5' }}>
                  Evaluated on 13,749 held-out clinical records.
                </p>
              </div>
              <Link to="/architecture" className="btn-secondary" style={{ justifyContent: 'center', fontSize: '13px', padding: '10px 16px', background: 'rgba(255,255,255,0.06)' }}>
                View Full Benchmark →
              </Link>
            </div>
          }
        />

        {/* Card 3: Deep Insights */}
        <FlipCard
          width={300}
          height={330}
          radius={20}
          background="rgba(18, 24, 38, 0.85)"
          glare={true}
          tilt={true}
          tiltMax={10}
          hoverScale={1.03}
          front={
            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', display: 'grid', placeItems: 'center' }}>
                    <Zap size={22} color="#a855f7" />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                    Clinical Correlates
                  </span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>Data Insights</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
                  Detailed analysis of systolic blood pressure, age, cholesterol, and BMI correlation weights.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#a855f7', opacity: 0.9 }}>
                <RotateCw size={13} /> Click or drag to inspect
              </div>
            </div>
          }
          back={
            <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(145deg, rgba(22, 30, 48, 0.95), rgba(12, 17, 28, 0.98))' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Top Predictor
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '6px 0 10px', color: '#ffffff' }}>Systolic BP (ap_hi)</h3>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Primary Risk Multiplier</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#e11d48' }}>High Weight</div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.5' }}>
                  Exponential curve when ap_hi exceeds 130 mmHg.
                </p>
              </div>
              <Link to="/insights" className="btn-secondary" style={{ justifyContent: 'center', fontSize: '13px', padding: '10px 16px', background: 'rgba(255,255,255,0.06)' }}>
                Explore Correlates →
              </Link>
            </div>
          }
        />
      </motion.div>
    </div>
  );
}
