import { motion } from 'framer-motion';
import { ArrowRight, Activity, Award, Zap, RotateCw, Cpu, ShieldCheck, Binary, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoldText from '../components/FoldText';
import FlipCard from '../components/FlipCard';
import ScrollExpand from '../components/ScrollExpand';

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

      {/* React Bits: ScrollExpand with Pumping Glowing Heart */}
      <div style={{ width: '100%', maxWidth: '1000px', height: '620px', margin: '20px 0' }}>
        <ScrollExpand
          src="/ai-heart.jpg"
          alt="AI Cardiovascular Visualization"
          title="CardioCare Neural Core"
          scrollHint="Scroll down to expand view"
          useWindowScroll={true}
          startWidth={70}
          startHeight={72}
          startRadius={24}
          endRadius={16}
          mediaZoom={1.25}
          scrollDistance={0.8}
          holdDistance={0.2}
          mediaClassName="heart-pump"
          style={{ width: '100%', height: '100%' }}
        >
          <div style={{ maxWidth: '650px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(56,189,248,0.15)', padding: '4px 10px', borderRadius: '6px' }}>
              Real-Time Hemodynamic Core
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: '800', margin: '12px 0 8px', color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              Cardiovascular In-Memory Pipeline
            </h2>
            <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: '1.6', textShadow: '0 2px 14px rgba(0,0,0,0.8)' }}>
              Simultaneously evaluates 11 bio-markers across 6 classification architectures to isolate arterial disease probabilities.
            </p>
          </div>
        </ScrollExpand>
      </div>

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

      {/* Project Statistics Ribbon */}
      <motion.div 
        className="glass-card" 
        style={{ marginTop: '56px', width: '100%', padding: '28px 36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '28px', textAlign: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#38bdf8', letterSpacing: '-0.5px' }}>68,742</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>Clinical Training Records</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', letterSpacing: '-0.5px' }}>72.83%</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>Production Model Accuracy</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#e11d48', letterSpacing: '-0.5px' }}>11</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>Bio-Vitals Analyzed</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#a855f7', letterSpacing: '-0.5px' }}>&lt; 5 ms</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>FastAPI Model Latency</div>
        </div>
      </motion.div>

      {/* How the ML Pipeline Works */}
      <motion.div 
        style={{ marginTop: '64px', width: '100%' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>How the ML Pipeline Operates</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '580px', marginInline: 'auto' }}>
            From clinical vitals ingestion to in-memory probability inference, every step is mathematically calibrated against historical cardiovascular data.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Phase 01
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Patient Vitals Ingestion</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
              Collects 11 standardized metrics including systolic and diastolic blood pressure, cholesterol levels, glucose status, BMI, and lifestyle habits.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Phase 02
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>StandardScaler Transform</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
              Continuous features (age, height, weight, ap_hi, ap_lo) undergo standard normal distribution scaling matching our pickled scikit-learn pipeline.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#e11d48', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Phase 03
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Sigmoidal Risk Prediction</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
              The trained Logistic Regression decision boundary computes an exact cardiovascular disease risk probability percentage between 0% and 100%.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Which Model We Use & Why */}
      <motion.div 
        className="glass-card" 
        style={{ marginTop: '56px', width: '100%', padding: '36px', overflow: 'hidden' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Cpu size={20} color="#38bdf8" />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Production Engine Specifications
              </span>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              Core Model: Regularized Logistic Regression
            </h2>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            Active Serving Model
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px' }}>
          While non-linear ensemble models like Random Forest and Gradient Boosting were evaluated during research, <strong>Logistic Regression (with L2 Regularization)</strong> was selected as the active production classifier in <code style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '2px 6px', borderRadius: '4px' }}>cardio_model.pkl</code>. In medical diagnostics, explainability and smooth, well-calibrated probability distributions take precedence, ensuring healthcare practitioners understand exactly <em>how</em> each vital influences the final probability.
        </p>

        {/* 4 Pillars of the Model */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <Binary size={22} color="#38bdf8" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: '#ffffff' }}>Sigmoid Probability</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Calculates continuous risk confidence curves between 0.0 and 1.0 rather than hard heuristic step cuts.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <ShieldCheck size={22} color="#10b981" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: '#ffffff' }}>White-Box Explainability</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Transparent mathematical coefficients let doctors audit the precise weight of systolic BP, age, and cholesterol.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <Sliders size={22} color="#a855f7" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: '#ffffff' }}>StandardScaler Pipeline</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Fitted with mean and unit-variance normalization across 68k records, preventing feature scale dominance.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <Zap size={22} color="#e11d48" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: '#ffffff' }}>Sub-5ms Inference</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Zero tensor graph overhead — executes dot-product matrix multiplication in under 5 milliseconds on CPU.
            </p>
          </div>
        </div>

        {/* Technical Snapshot Ribbon */}
        <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', fontSize: '13px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Serialized Bundle: </span>
            <code style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>cardio_model.pkl</code>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Framework: </span>
            <strong style={{ color: '#ffffff' }}>Scikit-Learn & FastAPI</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Input Dimensions: </span>
            <strong style={{ color: '#ffffff' }}>11 Features (1D Vector)</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Trained Test Accuracy: </span>
            <strong style={{ color: '#10b981' }}>72.83% (ROC-AUC 79.03%)</strong>
          </div>
        </div>
      </motion.div>

      {/* Clinical Disclaimer Banner */}
      <motion.div 
        className="glass-card"
        style={{ marginTop: '50px', width: '100%', padding: '20px 28px', borderLeft: '4px solid #38bdf8', display: 'flex', alignItems: 'center', gap: '16px' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
          <strong style={{ color: '#ffffff' }}>Clinical Advisory:</strong> CardioCare AI is engineered as an educational and clinical decision-support tool. It computes risk estimates based on historical statistical models and should always be validated by licensed medical healthcare providers.
        </div>
      </motion.div>
    </div>
  );
}
