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
        className="glass-card" 
        style={{ marginBottom: '30px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="step-title" style={{ marginBottom: '20px' }}>
          <AlertTriangle size={28} style={{ color: '#e11d48' }} /> High Impact Features
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px', marginBottom: '20px' }}>
          According to the Logistic Regression weights, the strongest predictors of cardiovascular disease in this dataset are:
        </p>
        <ul style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '15px', paddingLeft: '20px' }}>
          <li><strong>Systolic Blood Pressure (ap_hi):</strong> The single highest correlating factor. As this number rises above 120, risk climbs exponentially.</li>
          <li><strong>Age:</strong> Risk increases linearly with age, especially accelerating after 50 years.</li>
          <li><strong>Cholesterol:</strong> Patients with 'High' or 'Very High' cholesterol see a significant multiplier on their baseline risk.</li>
          <li><strong>Weight:</strong> BMI/Weight acts as a strong compounding factor alongside blood pressure.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="form-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card" style={{ padding: '30px' }}>
          <TrendingUp size={28} style={{ color: '#38bdf8', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Lifestyle Impact</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
            Interestingly, smoking and alcohol consumption showed lower direct weights than blood pressure, but they are known clinical drivers of high blood pressure itself.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
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
