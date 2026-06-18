import { useState } from 'react';

const issueOptions = [
  { id: 'no_water', labelHi: 'पानी नहीं आ रहा', label: 'No water supply', iconType: 'no_water' },
  { id: 'dirty_water', labelHi: 'गंदा पानी', label: 'Dirty / discolored water', iconType: 'dirty_water' },
  { id: 'pipe_damage', labelHi: 'पाइप टूटा / लीक', label: 'Pipe damage / leakage', iconType: 'pipe_damage' },
];

const ReportIssueModal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selected) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelected(null);
        onClose();
      }, 2000);
    }
  };

  const renderIcon = (type) => {
    if (type === 'no_water') {
      return (
        <svg style={{ width: 24, height: 24, color: '#EF4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
    }
    if (type === 'dirty_water') {
      return (
        <svg style={{ width: 24, height: 24, color: '#78350F' }} fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    }
    if (type === 'pipe_damage') {
      return (
        <svg style={{ width: 24, height: 24, color: '#D97706' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4 bg-white rounded-t-2xl sm:rounded-2xl p-6 fade-in">
        {submitted ? (
          <div className="text-center py-8">
            <svg style={{ width: 56, height: 56, color: '#16A34A', margin: '0 auto 16px auto' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-semibold text-safe">शिकायत दर्ज हो गई</p>
            <p className="text-sm text-text-secondary mt-1">Complaint registered successfully</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-navy">समस्या बताएं</h3>
                <p className="text-sm text-text-muted">Report an Issue</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-full hover:bg-bg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {issueOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selected === opt.id
                      ? 'border-saffron bg-warning-light'
                      : 'border-border-light hover:border-saffron/40'
                  }`}
                >
                  <span className="flex-shrink-0">{renderIcon(opt.iconType)}</span>
                  <div>
                    <p className="font-medium text-text">{opt.labelHi}</p>
                    <p className="text-sm text-text-muted">{opt.label}</p>
                  </div>
                  {selected === opt.id && (
                    <span className="ml-auto text-saffron text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selected}
              className={`w-full mt-6 py-3.5 rounded-xl text-white font-semibold text-base transition-all ${
                selected
                  ? 'bg-saffron hover:bg-saffron-dark active:scale-[0.98]'
                  : 'bg-border cursor-not-allowed'
              }`}
            >
              शिकायत दर्ज करें / Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportIssueModal;
