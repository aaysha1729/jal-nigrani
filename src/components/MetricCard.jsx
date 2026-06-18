const MetricCard = ({ icon, label, labelHi, value, unit, status, statusColor, detail, className = '' }) => {
  const textColor = {
    safe: 'text-[#1E6B3C]',
    warning: 'text-[#E8911A]',
    critical: 'text-[#B91C1C]',
    info: 'text-[#4A90B8]',
  }[statusColor || status] || 'text-[#1B3A5C]';

  return (
    <div className={`bg-white rounded-xl border border-border-light p-6 shadow-sm flex flex-col justify-between h-full min-h-[100px] ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          {labelHi && <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{labelHi}</p>}
          <p className="text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
        </div>
        {icon && <span className="text-lg flex-shrink-0 ml-2">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold ${textColor}`}>{value}</span>
        {unit && <span className="text-xs text-text-muted">{unit}</span>}
      </div>
      {detail && <p className="mt-2 text-[10px] text-text-muted font-medium">{detail}</p>}
    </div>
  );
};

export default MetricCard;
