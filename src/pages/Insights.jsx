import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Insights() {
  return (
    <div className="main-container" style={{ maxWidth: '800px', marginTop: '40px' }}>
      <motion.div className="wizard-header" {...fadeTransition}>
        <h1>Data <span style={{ color: '#a78bfa' }}>Insights.</span></h1>
        <p>Key correlations and statistics extracted from our model's training data.</p>
      </motion.div>

      <motion.div 
        className="glass-card hover-card" 
        style={{ marginBottom: '30px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="step-title" style={{ marginBottom: '20px' }}>
          <AlertTriangle size={28} style={{ color: '#e11d48' }} /> High Impact Features
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px', marginBottom: '20px' }}>
          According to the Random Forest feature importances (Gini criterion) and tree decision splits, the strongest predictors of cardiovascular disease in this dataset are:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="pillar-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#e11d48', fontSize: '15px' }}>1. Systolic Blood Pressure (ap_hi)</strong>
              <span style={{ fontSize: '11px', color: '#e11d48', background: 'rgba(225,29,72,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>HIGHEST IMPORTANCE</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              The single highest Gini-importance factor. Non-linear risk escalates rapidly once blood pressure passes stage-1 hypertension (130+ mmHg).
            </p>
          </div>

          <div className="pillar-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#38bdf8', fontSize: '15px' }}>2. Patient Age</strong>
              <span style={{ fontSize: '11px', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>PRIMARY BRANCH</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Primary branching node across all 100 decision trees, multiplying baseline cardiovascular risk significantly after age 50.
            </p>
          </div>

          <div className="pillar-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#a855f7', fontSize: '15px' }}>3. Cholesterol Levels</strong>
              <span style={{ fontSize: '11px', color: '#a855f7', background: 'rgba(168,85,247,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>TIER PENALTY</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Patients with 'High' or 'Very High' cholesterol experience major branching penalties in decision pathways.
            </p>
          </div>

          <div className="pillar-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ color: '#10b981', fontSize: '15px' }}>4. Body Mass Index & Weight</strong>
              <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>COMPOUNDING</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
              Acts as a strong compounding predictor alongside systolic blood pressure and physical activity.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="form-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card hover-card" style={{ padding: '30px' }}>
          <TrendingUp size={28} style={{ color: '#38bdf8', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Lifestyle Impact</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
            Random Forest decision trees capture the indirect compounding effects of smoking and alcohol consumption — while individual linear weights are moderate, their presence significantly lowers the systolic threshold for a high-risk leaf node.
          </p>
        </div>

        <div className="glass-card hover-card" style={{ padding: '30px' }}>
          <BarChart3 size={28} style={{ color: '#10b981', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Dataset Balance</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
            The model was trained on ~70,000 patient records perfectly balanced between positive and negative cases, preventing bias toward a 'healthy' default prediction.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
