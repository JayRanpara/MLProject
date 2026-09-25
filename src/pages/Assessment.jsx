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

function InputField({ label, value, onChange, min, max, unit }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-wrapper">
        <input 
          type="number" 
          value={value === undefined || value === null ? '' : value} 
          min={min} 
          max={max} 
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }} 
        />
        {unit && <span>{unit}</span>}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange, options }) {
  return (
    <div className="toggle-group">
      <span>{label}</span>
      <div className="segmented-control">
        {options.map((opt) => (
          <button
            key={opt.val}
            type="button"
            className={value === opt.val ? 'active' : ''}
            onClick={() => onChange(opt.val)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Assessment() {
  const [form, setForm] = useState(initialForm);
  const [modelType, setModelType] = useState('rf'); // 'rf', 'lr', 'ensemble'
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
    
    // Clean empty values to numerical defaults if left blank
    const cleanPayload = {
      age: form.age === '' ? 45 : Number(form.age),
      gender: Number(form.gender) || 0,
      height: form.height === '' ? 165 : Number(form.height),
      weight: form.weight === '' ? 68 : Number(form.weight),
      ap_hi: form.ap_hi === '' ? 120 : Number(form.ap_hi),
      ap_lo: form.ap_lo === '' ? 80 : Number(form.ap_lo),
      cholesterol: Number(form.cholesterol) || 0,
      gluc: Number(form.gluc) || 0,
      smoke: Number(form.smoke) || 0,
      alco_1: Number(form.alco_1) || 0,
      active_1: Number(form.active_1) !== undefined ? Number(form.active_1) : 1,
    };

    try {
      const response = await fetch(`${API_URL}/predict?model_type=${modelType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanPayload),
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

  return (
    <div className="main-container">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="hero" className="wizard-header" {...fadeTransition} style={{ marginTop: '20px' }}>
            <h1>A clearer view of <span style={{ color: 'var(--text-accent)' }}>heart health.</span></h1>
            <p style={{ marginBottom: '40px' }}>Enter your current health indicators to receive a personalised cardiovascular risk estimate in a few simple steps.</p>
            <div className="glass-card hover-card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', padding: '30px' }}>
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
            {/* Model Architecture Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 12px', borderRadius: '999px', fontWeight: '600', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                Primary Model: 100-Tree Random Forest (73.21% Test Acc)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setModelType('rf')}
                  style={{
                    background: modelType === 'rf' ? '#10b981' : 'transparent',
                    color: modelType === 'rf' ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: modelType === 'rf' ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none'
                  }}
                >
                  🌲 Random Forest (Champion)
                </button>
                <button
                  type="button"
                  onClick={() => setModelType('lr')}
                  style={{
                    background: modelType === 'lr' ? '#38bdf8' : 'transparent',
                    color: modelType === 'lr' ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  📈 Logistic Regression
                </button>
                <button
                  type="button"
                  onClick={() => setModelType('ensemble')}
                  style={{
                    background: modelType === 'ensemble' ? '#a855f7' : 'transparent',
                    color: modelType === 'ensemble' ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  🧬 Dual Ensemble
                </button>
              </div>
            </div>

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
                      <InputField label="Age" value={form.age} onChange={(v) => setField('age', v)} min={18} max={100} unit="years" />
                      <Toggle label="Biological Sex" value={form.gender} onChange={(v) => setField('gender', v)} options={[{val: 0, label: 'Female'}, {val: 1, label: 'Male'}]} />
                      <InputField label="Height" value={form.height} onChange={(v) => setField('height', v)} min={100} max={250} unit="cm" />
                      <InputField label="Weight" value={form.weight} onChange={(v) => setField('weight', v)} min={30} max={200} unit="kg" />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" {...fadeTransition}>
                    <div className="step-title"><Activity size={24} /> Blood Pressure</div>
                    <div className="form-grid">
                      <InputField label="Systolic (High)" value={form.ap_hi} onChange={(v) => setField('ap_hi', v)} min={70} max={250} unit="mmHg" />
                      <InputField label="Diastolic (Low)" value={form.ap_lo} onChange={(v) => setField('ap_lo', v)} min={40} max={150} unit="mmHg" />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" {...fadeTransition}>
                    <div className="step-title"><HeartPulse size={24} /> Lifestyle & Markers</div>
                    <div className="form-grid single">
                      <Toggle label="Cholesterol Level" value={form.cholesterol} onChange={(v) => setField('cholesterol', v)} options={[{val: 0, label: 'Normal'}, {val: 1, label: 'High'}, {val: 2, label: 'Very High'}]} />
                      <Toggle label="Glucose Level" value={form.gluc} onChange={(v) => setField('gluc', v)} options={[{val: 0, label: 'Normal'}, {val: 1, label: 'High'}, {val: 2, label: 'Very High'}]} />
                    </div>
                    <div className="form-grid">
                      <Toggle label="Smokes" value={form.smoke} onChange={(v) => setField('smoke', v)} options={[{val: 0, label: 'No'}, {val: 1, label: 'Yes'}]} />
                      <Toggle label="Alcohol Intake" value={form.alco_1} onChange={(v) => setField('alco_1', v)} options={[{val: 0, label: 'No'}, {val: 1, label: 'Yes'}]} />
                      <Toggle label="Active" value={form.active_1} onChange={(v) => setField('active_1', v)} options={[{val: 0, label: 'No'}, {val: 1, label: 'Yes'}]} />
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
                <h3>Analysing your profile with {modelType === 'rf' ? 'Random Forest' : modelType === 'lr' ? 'Logistic Regression' : 'Ensemble'}...</h3>
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
                <div className="wizard-header">
                  <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>
                    Engine: {result.selected_model || 'Random Forest'}
                  </div>
                  <h2>Your Risk Estimate</h2>
                </div>
                
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

                {/* Multi-Model Comparison Breakdown */}
                {result.models && (
                  <div className="hover-card" style={{ margin: '28px 0', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px 20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                      Cross-Model Consensus
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                      <div className="consensus-card" style={{ 
                        background: modelType === 'rf' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.05)', 
                        padding: '12px 14px', 
                        borderRadius: '12px', 
                        border: modelType === 'rf' ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.2)',
                        boxShadow: modelType === 'rf' ? '0 0 12px rgba(16, 185, 129, 0.2)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>🌲 Random Forest</div>
                          <span style={{ fontSize: '9px', background: '#10b981', color: '#ffffff', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>CHAMPION</span>
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
                          {Math.round(result.models.random_forest.risk_probability * 100)}%
                        </div>
                        <div style={{ fontSize: '10px', color: '#10b981' }}>73.21% test acc</div>
                      </div>

                      <div className="consensus-card" style={{ 
                        background: modelType === 'lr' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.05)', 
                        padding: '12px 14px', 
                        borderRadius: '12px', 
                        border: modelType === 'lr' ? '1px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.15)',
                        boxShadow: modelType === 'lr' ? '0 0 12px rgba(56, 189, 248, 0.2)' : 'none'
                      }}>
                        <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700' }}>📈 Logistic Regression</div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
                          {Math.round(result.models.logistic_regression.risk_probability * 100)}%
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>72.83% test acc</div>
                      </div>

                      <div className="consensus-card" style={{ 
                        background: modelType === 'ensemble' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(168, 85, 247, 0.05)', 
                        padding: '12px 14px', 
                        borderRadius: '12px', 
                        border: modelType === 'ensemble' ? '1px solid #a855f7' : '1px solid rgba(168, 85, 247, 0.15)',
                        boxShadow: modelType === 'ensemble' ? '0 0 12px rgba(168, 85, 247, 0.2)' : 'none'
                      }}>
                        <div style={{ fontSize: '11px', color: '#a855f7', fontWeight: '700' }}>🧬 Dual Consensus</div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
                          {Math.round(result.models.ensemble.risk_probability * 100)}%
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Ensemble mean</div>
                      </div>
                    </div>
                  </div>
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
