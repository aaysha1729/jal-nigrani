const statusConfig = {
  safe: { bg: 'bg-safe-light', text: 'text-safe', border: 'border-safe/20', label: 'Safe' },
  optimal: { bg: 'bg-safe-light', text: 'text-safe', border: 'border-safe/20', label: 'Optimal' },
  good: { bg: 'bg-safe-light', text: 'text-safe', border: 'border-safe/20', label: 'Good' },
  normal: { bg: 'bg-safe-light', text: 'text-safe', border: 'border-safe/20', label: 'Normal' },
  warning: { bg: 'bg-warning-light', text: 'text-warning', border: 'border-warning/20', label: 'Warning' },
  low: { bg: 'bg-warning-light', text: 'text-warning', border: 'border-warning/20', label: 'Low' },
  critical: { bg: 'bg-critical-light', text: 'text-critical', border: 'border-critical/20', label: 'Critical' },
  unsafe: { bg: 'bg-critical-light', text: 'text-critical', border: 'border-critical/20', label: 'Unsafe' },
};

const StatusBadge = ({ status, label }) => {
  const config = statusConfig[status] || statusConfig.safe;
  const displayLabel = label || config.label;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${config.bg} ${config.text} ${config.border}`}
    >
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
