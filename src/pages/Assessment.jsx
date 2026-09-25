import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, User, Activity, ArrowRight, ArrowLeft, Shield, RefreshCcw, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const initialForm = {
  age: 45, gender: 0, height: 165, weight: 68,
  ap_hi: 120, ap_lo: 80,
  cholesterol: 0, gluc: 0, smoke: 0, alco_1: 0, active_1: 1,
};

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export default function Assessment() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const setField = (field, value) => setForm(c => ({ ...c, [field]: value }));
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const reset = () => { setForm(initialForm); setResult(null); setStatus('idle'); setStep(0); };

  async function submitAssessment() {
    setStep(4);
    setStatus('loading');
    setError('');
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Prediction failed.');
      setResult(data);
      setStatus('complete');
    } catch (err) {
      setStatus('error');
      setError(err.message.includes('fetch') ? 'Cannot reach API. Ensure Python server is running.' : err.message);
    }
  }

  const InputField = ({ label, field, min, max, unit }) => (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-wrapper">
        <input 
          type="number" 
          value={form[field]} 
          min={min} max={max} 
          onChange={(e) => setField(field, Number(e.target.value))} 
        />
        {unit && <span>{unit}</span>}
      </div>
    </div>
  );

  const Toggle = ({ label, field, options }) => (
    <div className="toggle-group">
      <span>{label}</span>
      <div className="segmented-control">
        {options.map((opt) => (
          <button
            key={opt.val}
            type="button"
            className={form[field] === opt.val ? 'active' : ''}
            onClick={() => setField(field, opt.val)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="hero" className="wizard-header" {...fadeTransition} style={{ marginTop: '20px' }}>
            <h1>A clearer view of <span style={{ color: 'var(--text-accent)' }}>heart health.</span></h1>
            <p style={{ marginBottom: '40px' }}>Enter your current health indicators to receive a personalised cardiovascular risk estimate in a few simple steps.</p>
            <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', padding: '30px' }}>
              <Shield size={32} style={{ color: 'var(--text-accent)', marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '8px' }}>Private & Secure</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Your data is processed locally by the clinical model and is never stored.</p>
              <button className="btn-primary" onClick={nextStep} style={{ width: '100%', justifyContent: 'center' }}>
                Start Assessment <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step > 0 && step < 4 && (
          <motion.div key="wizard" {...fadeTransition}>
            <div className="progress-container">
              {[1, 2, 3].map(i => (
                <div key={i} className={`progress-dot ${step >= i ? 'active' : ''}`} />
              ))}
            </div>
            
            <div className="glass-card">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" {...fadeTransition}>
                    <div className="step-title"><User size={24} /> Basic Profile</div>
                    <div className="form-grid">
                      <InputField label="Age" field="age" min={18} max={100} unit="years" />
                      <Toggle label="Biological Sex" field="gender" options={[{val: 0, label: 'Female'}, {val: 1, label: 'Male'}]} />
                      <InputField label="Height" field="height" min={100} max={250} unit="cm" />
                      <InputField label="Weight" field="weight" min={30} max={200} unit="kg" />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" {...fadeTransition}>
                    <div className="step-title"><Activity size={24} /> Blood Pressure</div>
                    <div className="form-grid">
                      <InputField label="Systolic (High)" field="ap_hi" min={70} max={250} unit="mmHg" />
                      <InputField label="Diastolic (Low)" field="ap_lo" min={40} max={150} unit="mmHg" />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" {...fadeTransition}>
                    <div className="step-title"><HeartPulse size={24} /> Lifestyle & Markers</div>
                    <div className="form-grid single">
                      <Toggle label="Cholesterol Level" field="cholesterol" options={[{val: 0, label: 'Normal'}, {val: 1, label: 'High'}, {val: 2, label: 'Very High'}]} />
                      <Toggle label="Glucose Level" field="gluc" options={[{val: 0, label: 'Normal'}, {val: 1, label: 'High'}, {val: 2, label: 'Very High'}]} />
                    </div>
                    <div className="form-grid">
                      <Toggle label="Smokes" field="smoke" options={[{val: 0, label: 'No'}, {val: 1, label: 'Yes'}]} />
                      <Toggle label="Alcohol Intake" field="alco_1" options={[{val: 0, label: 'No'}, {val: 1, label: 'Yes'}]} />
                      <Toggle label="Active" field="active_1" options={[{val: 0, label: 'No'}, {val: 1, label: 'Yes'}]} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="wizard-nav">
                <button className="btn-secondary" onClick={prevStep}><ArrowLeft size={16} /> Back</button>
                {step < 3 ? (
                  <button className="btn-primary" onClick={nextStep}>Continue <ArrowRight size={16} /></button>
                ) : (
                  <button className="btn-primary" onClick={submitAssessment}>Analyse Results <Activity size={16} /></button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="result" className="glass-card result-container" {...fadeTransition}>
            {status === 'loading' && (
              <div style={{ padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Loader2 size={48} style={{ color: 'var(--text-accent)', marginBottom: '20px' }} />
                </motion.div>
                <h3>Analysing your profile...</h3>
                <p>Running indicators through the clinical model.</p>
              </div>
            )}
            
            {status === 'error' && (
              <div style={{ padding: '40px 0' }}>
                <div className="risk-badge high"><i></i> Error Occurred</div>
                <h3>{error}</h3>
                <button className="btn-secondary" onClick={prevStep} style={{ margin: '20px auto 0' }}>Go Back</button>
              </div>
            )}

            {status === 'complete' && result && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                <div className="wizard-header"><h2>Your Risk Estimate</h2></div>
                
                <div className={`score-circle ${result.prediction === 1 ? 'high' : 'low'}`}>
                  <svg viewBox="0 0 100 100">
                    <circle className="bg-circle" cx="50" cy="50" r="44" />
                    <circle 
                      className="progress-circle" 
                      cx="50" cy="50" r="44" 
                      strokeDasharray="276" 
                      strokeDashoffset={276 - (276 * Math.round(result.risk_probability * 100)) / 100} 
                    />
                  </svg>
                  <div className="score-content">
                    <strong>{Math.round(result.risk_probability * 100)}<span style={{fontSize:'24px'}}>%</span></strong>
                    <span>Risk Score</span>
                  </div>
                </div>

                {result.prediction === 1 ? (
                  <>
                    <div className="risk-badge high"><i></i> Elevated Risk</div>
                    <h3>Worth discussing with a clinician.</h3>
                  </>
                ) : (
                  <>
                    <div className="risk-badge low"><i></i> Lower Risk</div>
                    <h3>Your indicators show a lower estimated risk.</h3>
                  </>
                )}
                
                <p>This is a model estimate, not a medical diagnosis. Speak with a qualified clinician for health decisions.</p>
                
                <button className="btn-secondary" onClick={reset} style={{ margin: '0 auto' }}>
                  <RefreshCcw size={16} /> Start New Assessment
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
