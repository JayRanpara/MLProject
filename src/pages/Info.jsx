import { motion } from 'framer-motion';
import { Target, Database, BrainCircuit, Activity, Info as InfoIcon, Award, CheckCircle2 } from 'lucide-react';
import FoldText from '../components/FoldText';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Info() {
  return (
    <div className="main-container" style={{ maxWidth: '1000px', marginTop: '40px', paddingBottom: '40px' }}>
      <motion.div className="wizard-header" {...fadeTransition}>
        <div style={{ marginBottom: '8px' }}>
          <FoldText
            text="Clinical Architecture"
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.03}
            ease="power3.out"
            fontSize="clamp(2rem, 4vw, 2.8rem)"
            fontWeight={800}
            color="#ffffff"
          />
        </div>
        <p>Understanding the models, features, and accuracy benchmarks behind CardioCare.</p>
      </motion.div>

      <motion.div className="glass-card hover-card" style={{ marginBottom: '40px', padding: '0', overflow: 'hidden' }} {...fadeTransition}>
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Multi-Model Classification Benchmark (Test Set Evaluation)</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>All 6 classification architectures evaluated on the identical 80/20 train-test split (54,993 train / 13,749 test records from cardio_train.csv).</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <CheckCircle2 size={16} /> Random Forest Leads Production Accuracy
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table className="benchmark-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '16px 8px' }}>Rank</th>
                  <th style={{ padding: '16px 8px' }}>Classification Model</th>
                  <th style={{ padding: '16px 8px' }}>Test Accuracy</th>
                  <th style={{ padding: '16px 8px' }}>ROC-AUC</th>
                  <th style={{ padding: '16px 8px' }}>Precision</th>
                  <th style={{ padding: '16px 8px' }}>Recall</th>
                  <th style={{ padding: '16px 8px' }}>F1-Score</th>
                  <th style={{ padding: '16px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(16, 185, 129, 0.03)' }}>
                  <td style={{ padding: '20px 8px' }}><div style={{ width: '28px', height: '28px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', display: 'grid', placeItems: 'center' }}><Award size={16} color="#10b981" /></div></td>
                  <td style={{ padding: '20px 8px', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Random Forest <span style={{ background: '#10b981', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>ACTIVE PRIMARY & CHAMPION</span>
                  </td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '700' }}>73.205%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>80.03%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>74.79%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>68.54%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>71.53%</td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} /> Active Serving Model</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>2nd</td>
                  <td style={{ padding: '20px 8px', color: '#e2e8f0', fontWeight: '600' }}>Gradient Boosting</td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600' }}>73.154%</td>
                  <td style={{ padding: '20px 8px' }}>80.08%</td>
                  <td style={{ padding: '20px 8px' }}>74.49%</td>
                  <td style={{ padding: '20px 8px' }}>68.94%</td>
                  <td style={{ padding: '20px 8px' }}>71.61%</td>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>Evaluated</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(56, 189, 248, 0.04)' }}>
                  <td style={{ padding: '20px 8px', color: '#38bdf8', fontWeight: '600' }}>3rd</td>
                  <td style={{ padding: '20px 8px', color: '#38bdf8', fontWeight: '600' }}>
                    Logistic Regression <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px', marginLeft: '6px' }}>DUAL CONSENSUS</span>
                  </td>
                  <td style={{ padding: '20px 8px', color: '#38bdf8', fontWeight: '700' }}>72.827%</td>
                  <td style={{ padding: '20px 8px' }}>79.03%</td>
                  <td style={{ padding: '20px 8px' }}>75.08%</td>
                  <td style={{ padding: '20px 8px' }}>66.85%</td>
                  <td style={{ padding: '20px 8px' }}>70.73%</td>
                  <td style={{ padding: '20px 8px', color: '#38bdf8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} /> Bundled in API</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>4th</td>
                  <td style={{ padding: '20px 8px', color: '#e2e8f0' }}>K-Nearest Neighbors</td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600' }}>72.667%</td>
                  <td style={{ padding: '20px 8px' }}>78.63%</td>
                  <td style={{ padding: '20px 8px' }}>73.91%</td>
                  <td style={{ padding: '20px 8px' }}>68.52%</td>
                  <td style={{ padding: '20px 8px' }}>71.11%</td>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>Evaluated</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>5th</td>
                  <td style={{ padding: '20px 8px', color: '#e2e8f0' }}>Decision Tree</td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600' }}>72.551%</td>
                  <td style={{ padding: '20px 8px' }}>78.05%</td>
                  <td style={{ padding: '20px 8px' }}>73.18%</td>
                  <td style={{ padding: '20px 8px' }}>69.60%</td>
                  <td style={{ padding: '20px 8px' }}>71.35%</td>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>Evaluated</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>6th</td>
                  <td style={{ padding: '20px 8px', color: '#e2e8f0' }}>Gaussian Naive Bayes</td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600' }}>70.958%</td>
                  <td style={{ padding: '20px 8px' }}>77.67%</td>
                  <td style={{ padding: '20px 8px' }}>75.66%</td>
                  <td style={{ padding: '20px 8px' }}>60.23%</td>
                  <td style={{ padding: '20px 8px' }}>67.07%</td>
                  <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>Evaluated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div className="glass-card hover-card" style={{ marginBottom: '30px' }} {...fadeTransition}>
        <div className="step-title" style={{ marginBottom: '20px', fontSize: '20px' }}>
          <Database size={22} /> Features Integrated
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px', marginBottom: '20px' }}>
          The production Random Forest model is trained on 11 standardized clinical indicators:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Age</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Years (Integer)</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Biological Sex</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Male / Female</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Height</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Centimeters (cm)</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Weight</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Kilograms (kg)</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#38bdf8', fontWeight: '700', fontSize: '14px' }}>ap_hi (Systolic BP)</span>
            <span style={{ color: '#38bdf8', fontSize: '12px', fontWeight: '600' }}>Top Predictor</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>ap_lo (Diastolic BP)</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>mmHg</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#e11d48', fontWeight: '700', fontSize: '14px' }}>Cholesterol</span>
            <span style={{ color: '#e11d48', fontSize: '12px', fontWeight: '600' }}>3-Tier Category</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Glucose</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>3-Tier Category</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Smoking</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Smoker / Non-Smoker</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Alcohol Intake</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Intake Frequency</span>
          </div>
          <div className="feature-pill">
            <span style={{ color: '#10b981', fontWeight: '700', fontSize: '14px' }}>Physical Activity</span>
            <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>Active Lifestyle</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
