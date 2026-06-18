import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';
import { useAuth } from '../context/AuthContext';
import useLiveData from '../hooks/useLiveData';
import { initialAlerts, generate24HourPressureData } from '../data/mockData';

const PRESSURE_COLORS = {
  normal: 'text-navy',
  low: 'text-warning',
  critical: 'text-critical',
};

const getBatteryColor = (percentage) => {
  if (percentage >= 50) return '#16A34A';
  if (percentage >= 20) return '#F59E0B';
  return '#DC2626';
};

const FlowArrow = ({ flowRate, anomaly }) => (
  <div className="flex flex-col items-center justify-center min-w-[80px] py-2">
    <span style={{ fontSize: 28, fontWeight: 600, color: anomaly ? '#DC2626' : '#64748B', lineHeight: 1 }}>
      →
    </span>
    <span style={{ fontSize: 24, fontWeight: 500, color: anomaly ? '#DC2626' : '#64748B', marginTop: 8 }}>
      {flowRate} L/min
    </span>
  </div>
);

const PressureCard = ({ node }) => {
  const statusLabels = {
    normal: 'Normal',
    low: 'Low',
    critical: 'Critical',
  };

  const getBorderColor = () => {
    if (node.status === 'low') return '#F59E0B';
    if (node.status === 'critical') return '#DC2626';
    return '#16A34A';
  };

  const getStatusColors = () => {
    if (node.status === 'normal') return { bg: '#16A34A1A', text: '#16A34A' };
    if (node.status === 'low') return { bg: '#F59E0B1A', text: '#F59E0B' };
    return { bg: '#DC26261A', text: '#DC2626' };
  };

  const statusColors = getStatusColors();

  return (
    <div style={{
      width: 320,
      height: 180,
      backgroundColor: '#FFFFFF',
      border: `2px solid ${getBorderColor()}`,
      borderRadius: 18,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(15,23,42,0.02)',
      textAlign: 'left'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: '#0F172A', fontFamily: "'Inter', sans-serif" }}>
          {node.label.includes('Start') ? 'P1' : node.label.includes('Middle') ? 'P2' : 'P3'}
        </span>
        <span style={{
          fontSize: 14,
          fontWeight: 600,
          backgroundColor: statusColors.bg,
          color: statusColors.text,
          padding: '8px 14px',
          borderRadius: 999,
          whiteSpace: 'nowrap'
        }}>
          ● {statusLabels[node.status] || node.status}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
        <span style={{ fontSize: 64, fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>
          {node.pressure.toFixed(2)}
        </span>
        <span style={{ fontSize: 28, fontWeight: 500, color: '#64748B', marginTop: 4 }}>
          MPa
        </span>
      </div>
    </div>
  );
};

const SmallMetric = ({ title, value, icon, tone = '#0F172A' }) => (
  <div style={{
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: 18,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxShadow: '0 4px 20px rgba(15,23,42,0.01)',
    textAlign: 'left'
  }}>
    <p style={{ fontSize: 18, fontWeight: 500, color: '#64748B', margin: 0, fontFamily: "'Inter', sans-serif" }}>{title}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, fontWeight: 700, color: tone }}>
      {icon}
      <span>{value}</span>
    </div>
  </div>
);

const JalBahiniDashboard = () => {
  const { lang } = useAuth();
  const {
    pressureNodes,
    battery,
    gatewayOnline,
    waterSafe,
    activeAlertCount,
    pressureDropAnomaly,
    formatLastUpdated,
    isStale,
    tds,
  } = useLiveData();

  const [alerts, setAlerts] = useState(initialAlerts);

  const pressureTrendData = useMemo(() => generate24HourPressureData(), []);

  const handleAcknowledge = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif", position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', left: 0, top: '15%', width: 150, height: 400, borderTopRightRadius: 9999, borderBottomRightRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: 0, top: '35%', width: 150, height: 400, borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />

      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 10 }}>
        {/* Page Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 500, color: '#0F172A', marginBottom: 12, lineHeight: 1.1 }}>
            {lang === 'en' ? 'Rampur - Operator Dashboard' : 'रामपुर - ऑपरेटर डैशबोर्ड'}
          </h1>
          <p style={{ fontSize: 22, fontWeight: 400, color: '#64748B' }}>
            {lang === 'en' ? 'Last refresh:' : 'आखिरी रिफ्रेश:'} {formatLastUpdated()} {isStale ? (lang === 'en' ? '(Stale)' : '(बासी)') : ''}
          </p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Section 1: Pipeline Layout Card */}
          <section style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 32, display: 'flex', flexDirection: 'column', marginBottom: 24, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 28 }}>
              {lang === 'en' ? 'Pipeline Layout & Real time Flow' : 'पाइपलाइन लेआउट और वास्तविक समय प्रवाह'}
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 py-4 bg-white w-full">
                <PressureCard node={pressureNodes.p1} />
                <FlowArrow
                  flowRate={pressureNodes.p1.flowRate}
                  anomaly={pressureDropAnomaly.p1p2}
                />
                <PressureCard node={pressureNodes.p2} />
                <FlowArrow
                  flowRate={pressureNodes.p2.flowRate}
                  anomaly={pressureDropAnomaly.p2p3}
                />
                <PressureCard node={pressureNodes.p3} />
              </div>
            </div>
          </section>

          {/* Section 2: Small Metrics Grid */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-4" style={{ marginBottom: 24 }}>
            <SmallMetric
              title="Water Quality"
              value={waterSafe ? (lang === 'en' ? `Safe (TDS: ${tds} ppm)` : `सुरक्षित (TDS: ${tds} ppm)`) : (lang === 'en' ? 'Unsafe' : 'असुरक्षित')}
              icon={
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg style={{ width: 22, height: 22, color: waterSafe ? '#16A34A' : '#DC2626' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {waterSafe && (
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#22C55E',
                      display: 'inline-block'
                    }} />
                  )}
                </div>
              }
              tone={waterSafe ? '#16A34A' : '#DC2626'}
            />
            <SmallMetric
              title="Battery Status"
              value={`${battery}%`}
              icon={
                <svg style={{ width: 22, height: 22, color: '#0F172A' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                  <path d="M22 11v2" />
                </svg>
              }
              tone={getBatteryColor(battery)}
            />
            <SmallMetric
              title="Gateway Status"
              value={gatewayOnline ? 'Online' : 'Offline'}
              icon={<span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: gatewayOnline ? '#16A34A' : '#DC2626' }}></span>}
              tone={gatewayOnline ? '#16A34A' : '#DC2626'}
            />
            <SmallMetric
              title="System Alerts"
              value={`${activeAlertCount} alerts`}
              icon={
                <svg style={{ width: 22, height: 22, color: activeAlertCount > 0 ? '#DC2626' : '#0F172A' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              tone={activeAlertCount > 0 ? '#DC2626' : '#0F172A'}
            />
          </section>

          {/* Section 3: Bottom Grid - Active Alerts (Left) & Pressure Trend Graph (Right) */}
          <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 24, alignItems: 'start', marginBottom: 24 }}>
            
            {/* Active Alerts Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 30px rgba(15,23,42,0.01)', minHeight: 460 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: 0 }}>Active Alerts</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {alerts.map((alert) => (
                  <div key={alert.id} style={{ display: 'flex', gap: 16, borderBottom: '1px solid #E5E7EB', padding: '16px 0', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: alert.severity === 'critical' ? '#DC2626' : alert.severity === 'warning' ? '#F59E0B' : '#16A34A',
                        display: 'inline-block',
                        marginTop: 6,
                        flexShrink: 0
                      }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                          {alert.description}
                        </p>
                        {alert.detail && (
                          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                            {alert.detail}
                          </p>
                        )}
                        {alert.escalation && (
                          <p style={{ fontSize: 13, color: '#16A34A', margin: 0, fontStyle: 'italic' }}>
                            {alert.escalation}
                          </p>
                        )}
                        {!alert.acknowledged && (
                          <button
                            onClick={() => handleAcknowledge(alert.id)}
                            style={{
                              marginTop: 12,
                              backgroundColor: '#F59E0B1A',
                              color: '#F59E0B',
                              border: '1px solid #F59E0B33',
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: 'pointer',
                              alignSelf: 'flex-start'
                            }}
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {alert.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pressure Trend Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 30px rgba(15,23,42,0.01)', minHeight: 460 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Pressure Trend (last 24 hours)
                </h3>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                  <span>● P1</span>
                  <span style={{ color: '#F59E0B' }}>● P2</span>
                  <span style={{ color: '#4A90B8' }}>● P3</span>
                </div>
              </div>

              <div style={{ height: 320, width: '100%', marginTop: 'auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pressureTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#888888" tickLine={false} />
                    <YAxis
                      domain={[0, 0.4]}
                      tick={{ fontSize: 11 }}
                      stroke="#888888"
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'MPa', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#888888' }}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D4D0C8', borderRadius: '8px' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                    <ReferenceLine
                      y={0.08}
                      stroke="#DC2626"
                      strokeDasharray="6 3"
                      label={{ value: 'Critical Threshold', position: 'right', fill: '#DC2626', fontSize: 11, fontWeight: 'bold' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="p1"
                      name="P1 — Start"
                      stroke="#1B3A5C"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="p2"
                      name="P2 — Middle"
                      stroke="#F59E0B"
                      strokeWidth={2.5}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="p3"
                      name="P3 — Tail"
                      stroke="#4A90B8"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>

        </div>
      </main>

      <CommonFooter />
    </div>
  );
};

export default JalBahiniDashboard;
