import { motion } from 'framer-motion';
import { Target, Database, BrainCircuit, Activity, Info as InfoIcon } from 'lucide-react';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

export default function Info() {
  return (
    <div className="main-container" style={{ maxWidth: '800px', marginTop: '40px', paddingBottom: '40px' }}>
      <motion.div className="wizard-header" {...fadeTransition}>
        <h1>Understanding <span style={{ color: 'var(--text-accent)' }}>Accuracy & Workflow.</span></h1>
        <p>Learn how the CardioSight model is trained and how it estimates your cardiovascular risk.</p>
      </motion.div>

      <motion.div className="glass-card" style={{ marginBottom: '30px' }} {...fadeTransition}>
        <div className="step-title" style={{ marginBottom: '20px' }}>
          <Target size={28} /> What is Accuracy?
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px', marginBottom: '20px' }}>
          In machine learning, <strong>Accuracy</strong> is the metric used to evaluate how often the model makes the correct prediction. 
          For CardioSight, our clinical Logistic Regression model achieved an accuracy of <strong>72.7%</strong> on the historical dataset. 
          This means it correctly identifies whether a patient has cardiovascular disease or not in nearly 73 out of 100 cases.
        </p>
        
        <div className="step-title" style={{ marginBottom: '20px', fontSize: '20px', marginTop: '30px' }}>
          <Database size={22} /> Features We Use
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px', marginBottom: '15px' }}>
          The model's predictions are based on 11 carefully selected health indicators (features):
        </p>
        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '15px', paddingLeft: '20px', columnCount: 2, columnGap: '40px' }}>
          <li><strong>Age:</strong> Age in years</li>
          <li><strong>Biological Sex:</strong> Male or Female</li>
          <li><strong>Height:</strong> Height in cm</li>
          <li><strong>Weight:</strong> Weight in kg</li>
          <li><strong>ap_hi:</strong> Systolic blood pressure</li>
          <li><strong>ap_lo:</strong> Diastolic blood pressure</li>
          <li><strong>Cholesterol:</strong> Normal, High, or Very High</li>
          <li><strong>Glucose:</strong> Normal, High, or Very High</li>
          <li><strong>Smoking:</strong> Non-smoker or Smoker</li>
          <li><strong>Alcohol:</strong> Intake frequency</li>
          <li><strong>Physical Activity:</strong> Active lifestyle</li>
        </ul>
      </motion.div>

      <motion.div className="glass-card" variants={staggerContainer} initial="initial" animate="animate">
        <div className="step-title" style={{ marginBottom: '30px' }}>
          <Activity size={28} /> Project Workflow
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div style={{ display: 'flex', gap: '20px' }} variants={staggerItem}>
            <div style={{ background: 'var(--input-bg)', width: '56px', height: '56px', borderRadius: '16px', display: 'grid', placeItems: 'center', border: '1px solid var(--input-border)', flexShrink: 0 }}>
              <Database size={24} style={{ color: 'var(--text-accent)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>1. Data Collection & Preprocessing</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                We start with a clinical dataset (`cardio_train.csv`). The data undergoes cleaning, normalization (scaling numeric values), and encoding of categorical variables.
              </p>
            </div>
          </motion.div>

          <motion.div style={{ display: 'flex', gap: '20px' }} variants={staggerItem}>
            <div style={{ background: 'var(--input-bg)', width: '56px', height: '56px', borderRadius: '16px', display: 'grid', placeItems: 'center', border: '1px solid var(--input-border)', flexShrink: 0 }}>
              <BrainCircuit size={24} style={{ color: 'var(--text-accent)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>2. Model Training</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                A machine learning model (e.g., Logistic Regression, Random Forest, or XGBoost) is trained on the preprocessed data to find patterns linking health indicators to cardiovascular disease. The model is saved as `cardio_model.pkl`.
              </p>
            </div>
          </motion.div>

          <motion.div style={{ display: 'flex', gap: '20px' }} variants={staggerItem}>
            <div style={{ background: 'var(--input-bg)', width: '56px', height: '56px', borderRadius: '16px', display: 'grid', placeItems: 'center', border: '1px solid var(--input-border)', flexShrink: 0 }}>
              <InfoIcon size={24} style={{ color: 'var(--text-accent)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>3. API & Inference</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
                A FastAPI Python server loads the saved model. When you submit the form, the API applies the exact same scaling to your inputs and asks the model for a probability score.
              </p>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
}
