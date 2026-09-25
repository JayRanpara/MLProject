import { motion } from 'framer-motion';
import { Target, Database, BrainCircuit, Activity, Info as InfoIcon, Award, CheckCircle2 } from 'lucide-react';

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Info() {
  return (
    <div className="main-container" style={{ maxWidth: '1000px', marginTop: '40px', paddingBottom: '40px' }}>
      <motion.div className="wizard-header" {...fadeTransition}>
        <h1>Clinical <span style={{ color: '#38bdf8' }}>Architecture.</span></h1>
        <p>Understanding the models, features, and accuracy benchmarks behind CardioCare.</p>
      </motion.div>

      <motion.div className="glass-card" style={{ marginBottom: '40px', padding: '0', overflow: 'hidden' }} {...fadeTransition}>
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Multi-Model Classification Benchmark (Test Set Evaluation)</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>All 6 classification architectures evaluated on the identical 80/20 train-test split (204,277 train / 51,070 test records).</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <CheckCircle2 size={16} /> Gradient Boosting Selected as Champion
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
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
                    Gradient Boosting <span style={{ background: '#10b981', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>CHAMPION</span>
                  </td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '700' }}>88.733%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>75.72%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>65.73%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>5.17%</td>
                  <td style={{ padding: '20px 8px', fontWeight: '600' }}>9.59%</td>
                  <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} /> Integrated & Serving</td>
                </tr>
                {[
                  { rank: '2nd', name: 'Random Forest', acc: '88.688%', roc: '75.12%', prec: '61.20%', rec: '4.80%', f1: '8.90%' },
                  { rank: '3rd', name: 'Logistic Regression', acc: '88.580%', roc: '75.25%', prec: '60.76%', rec: '3.25%', f1: '6.18%' },
                  { rank: '4th', name: 'Gaussian Naive Bayes', acc: '88.580%', roc: '72.84%', prec: '58.10%', rec: '2.90%', f1: '5.52%' },
                  { rank: '5th', name: 'K-Nearest Neighbors', acc: '87.531%', roc: '68.41%', prec: '41.50%', rec: '12.30%', f1: '18.96%' },
                  { rank: '6th', name: 'Decision Tree', acc: '80.061%', roc: '58.91%', prec: '22.40%', rec: '24.10%', f1: '23.22%' },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>{row.rank}</td>
                    <td style={{ padding: '20px 8px', color: '#e2e8f0' }}>{row.name}</td>
                    <td style={{ padding: '20px 8px', color: '#10b981', fontWeight: '600' }}>{row.acc}</td>
                    <td style={{ padding: '20px 8px' }}>{row.roc}</td>
                    <td style={{ padding: '20px 8px' }}>{row.prec}</td>
                    <td style={{ padding: '20px 8px' }}>{row.rec}</td>
                    <td style={{ padding: '20px 8px' }}>{row.f1}</td>
                    <td style={{ padding: '20px 8px', color: 'var(--text-muted)' }}>Evaluated</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div className="glass-card" style={{ marginBottom: '30px' }} {...fadeTransition}>
        <div className="step-title" style={{ marginBottom: '20px', fontSize: '20px' }}>
          <Database size={22} /> Features Integrated
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px', marginBottom: '15px' }}>
          The production model is trained on 11 core clinical indicators:
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
    </div>
  );
}
