import { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import useLiveData from '../hooks/useLiveData';
import { generate24HourFlowData, pipelineNodesHealth } from '../data/mockData';

const bottomInfo = { name: 'रामपुर / Rampur', role: 'Jal Bahini' };

// Helpers for status coloring
const getStatusColor = (status) => {
  switch (status) {
    case 'normal':
    case 'safe':
      return {
        text: 'text-[#16A34A]',
        bg: 'bg-[#16A34A]/10',
        border: 'border-[#16A34A]',
        hex: '#16A34A',
      };
    case 'low':
    case 'warning':
      return {
        text: 'text-[#F59E0B]',
        bg: 'bg-[#F59E0B]/10',
        border: 'border-[#F59E0B]',
        hex: '#F59E0B',
      };
    case 'critical':
      return {
        text: 'text-[#DC2626]',
        bg: 'bg-[#DC2626]/10',
        border: 'border-[#DC2626]',
        hex: '#DC2626',
      };
    default:
      return {
        text: 'text-[#64748B]',
        bg: 'bg-[#64748B]/10',
        border: 'border-[#64748B]',
        hex: '#64748B',
      };
  }
};

const getBatteryColor = (percentage) => {
  if (percentage >= 50) return '#16A34A'; // success
  if (percentage >= 20) return '#F59E0B'; // warning
  return '#DC2626'; // danger
};

const getSignalColor = (signal) => {
  if (signal.includes('Strong') || signal.includes('मजबूत')) return 'text-[#16A34A] font-semibold';
  if (signal.includes('Good') || signal.includes('अच्छा')) return 'text-[#F59E0B] font-semibold';
  return 'text-[#DC2626] font-semibold';
};

const PressureNodeCard = ({ node }) => {
  const statusLabels = {
    normal: 'Normal',
    low: 'Low',
    critical: 'Critical',
  };

  const getBorderColor = () => {
    if (node.status === 'low') return '#C28B53';
    if (node.status === 'critical') return '#A05252';
    return '#1E2530';
  };

  const getStatusColors = () => {
    if (node.status === 'normal') return { bg: '#E6F4EA', text: '#137333' };
    if (node.status === 'low') return { bg: '#FEF7E0', text: '#B06000' };
    return { bg: '#FCE8E6', text: '#C5221F' };
  };

  const statusColors = getStatusColors();

  return (
    <div style={{
      width: 250,
      height: 285,
      backgroundColor: '#FFFFFF',
      border: '1px solid #EFECE6',
      borderTop: `4px solid ${getBorderColor()}`,
      borderRadius: 8,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(30,37,48,0.01)',
      textAlign: 'left'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#1E2530', lineHeight: 1.3, margin: 0, fontFamily: "'Inter', sans-serif" }}>
          {node.label}
        </p>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          backgroundColor: statusColors.bg,
          color: statusColors.text,
          padding: '4px 8px',
          borderRadius: 12,
          whiteSpace: 'nowrap'
        }}>
          ● {statusLabels[node.status] || node.status}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
        <span style={{ fontSize: 48, fontWeight: 800, color: '#1E2530', lineHeight: 1 }}>
          {node.pressure.toFixed(2)}
        </span>
        <span style={{ fontSize: 28, fontWeight: 800, color: '#1E2530', marginTop: 4 }}>
          MPa
        </span>
      </div>
    </div>
  );
};

const PipelineMonitor = () => {
  const { lang } = useAuth();
  const {
    pressureNodes,
    battery,
    gatewayOnline,
    lastUpdated,
    isStale,
    pressureDropAnomaly,
    formatLastUpdated,
  } = useLiveData();

  const flowData = useMemo(() => generate24HourFlowData(), []);

  // Static statuses for flow arrows
  const arrow1Status = pressureDropAnomaly.p1p2 ? 'critical' : pressureNodes.p2.status;
  const arrow2Status = pressureDropAnomaly.p2p3 ? 'critical' : pressureNodes.p3.status;

  const arrow1Color = getStatusColor(arrow1Status);
  const arrow2Color = getStatusColor(arrow2Status);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif", position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', left: 0, top: '15%', width: 150, height: 400, borderTopRightRadius: 9999, borderBottomRightRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: 0, top: '35%', width: 150, height: 400, borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />

      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 40, position: 'relative', zIndex: 10 }}>
        {/* Page Header */}
        <div style={{ borderBottom: '1px solid #EFECE6', paddingBottom: 24 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 300, color: '#1E2530', marginBottom: 8 }}>
            {lang === 'en' ? 'Pipeline Monitor' : 'पाइपलाइन निगरानी'}
          </h1>
          <p style={{ fontSize: 16, color: '#5A6270' }}>
            {lang === 'en' ? 'Infrastructure health & distribution analytics' : 'बुनियादी ढांचा स्वास्थ्य और वितरण विश्लेषण'} • {formatLastUpdated()}
          </p>
        </div>

        {/* Centered Content Container */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Breadcrumbs */}
          <nav className="text-sm text-text-muted">
            <span>Home</span>
            <span className="mx-1">&gt;</span>
            <span className="text-[#1B3A5C] font-medium">Pipeline Monitor</span>
          </nav>

          {/* Section 1: Pipeline Schematic */}
          <section className="bg-white rounded-xl border border-border-light p-6 shadow-sm flex flex-col">
            <div className="bg-[#F5F3EF] -mx-6 -mt-6 px-6 py-4 border-b border-border-light rounded-t-xl mb-6">
              <h3 className="text-sm font-bold text-[#1B3A5C]">
                पाइपलाइन लेआउट और वास्तविक समय प्रवाह / Pipeline Layout & Real-time Flow
              </h3>
            </div>

            {/* Static Schematic Container */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-6 bg-[#F5F3EF]/35 rounded-xl border border-border-light">
              
              {/* NODE P1 */}
              <div className="flex-1 w-full max-w-[280px] bg-white rounded-xl border-2 p-6 shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[150px]"
                   style={{ borderColor: getStatusColor(pressureNodes.p1.status).hex }}>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">P1</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    pressureNodes.p1.status === 'normal' ? 'bg-[#1E6B3C]/10 text-[#1E6B3C]' : 'bg-[#E8911A]/10 text-[#E8911A]'
                  }`}>
                    • {pressureNodes.p1.status === 'normal' ? 'Normal' : 'Low'}
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <span className="text-4xl font-extrabold text-[#1B3A5C] tracking-tight leading-none">
                    {pressureNodes.p1.pressure.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-text-muted mt-1 uppercase tracking-wider">MPa</span>
                </div>
              </div>

              {/* FLOW ARROW 1 (P1 -> P2) */}
              <div className="flex flex-col items-center justify-center min-w-[80px]">
                {pressureDropAnomaly.p1p2 && (
                  <span className="text-[9px] bg-[#B91C1C]/10 text-[#B91C1C] px-2 py-0.5 rounded mb-1.5 font-bold border border-[#B91C1C]/20 text-center leading-none">
                    Leak
                  </span>
                )}
                <span className={`text-2xl font-bold leading-none ${pressureDropAnomaly.p1p2 ? 'text-[#B91C1C]' : 'text-text-secondary'}`}>→</span>
                <span className={`text-xs font-bold mt-1.5 ${pressureDropAnomaly.p1p2 ? 'text-[#B91C1C]' : 'text-text-muted'}`}>
                  {pressureNodes.p1.flowRate} L/min
                </span>
              </div>

              {/* NODE P2 */}
              <div className="flex-1 w-full max-w-[280px] bg-white rounded-xl border-2 p-6 shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[150px]"
                   style={{ borderColor: getStatusColor(pressureNodes.p2.status).hex }}>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">P2</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    pressureNodes.p2.status === 'normal' ? 'bg-[#1E6B3C]/10 text-[#1E6B3C]' : 'bg-[#E8911A]/10 text-[#E8911A]'
                  }`}>
                    • {pressureNodes.p2.status === 'normal' ? 'Normal' : 'Low'}
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <span className="text-4xl font-extrabold text-[#1B3A5C] tracking-tight leading-none">
                    {pressureNodes.p2.pressure.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-text-muted mt-1 uppercase tracking-wider">MPa</span>
                </div>
              </div>

              {/* FLOW ARROW 2 (P2 -> P3) */}
              <div className="flex flex-col items-center justify-center min-w-[80px]">
                {pressureDropAnomaly.p2p3 && (
                  <span className="text-[9px] bg-[#B91C1C]/10 text-[#B91C1C] px-2 py-0.5 rounded mb-1.5 font-bold border border-[#B91C1C]/20 text-center leading-none">
                    Leak
                  </span>
                )}
                <span className={`text-2xl font-bold leading-none ${pressureDropAnomaly.p2p3 ? 'text-[#B91C1C]' : 'text-text-secondary'}`}>→</span>
                <span className={`text-xs font-bold mt-1.5 ${pressureDropAnomaly.p2p3 ? 'text-[#B91C1C]' : 'text-text-muted'}`}>
                  {pressureNodes.p2.flowRate} L/min
                </span>
              </div>

              {/* NODE P3 */}
              <div className="flex-1 w-full max-w-[280px] bg-white rounded-xl border-2 p-6 shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[150px]"
                   style={{ borderColor: getStatusColor(pressureNodes.p3.status).hex }}>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">P3</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    pressureNodes.p3.status === 'normal' ? 'bg-[#1E6B3C]/10 text-[#1E6B3C]' : 'bg-[#E8911A]/10 text-[#E8911A]'
                  }`}>
                    • {pressureNodes.p3.status === 'normal' ? 'Normal' : 'Low'}
                  </span>
                </div>
                <div className="mt-4 flex flex-col">
                  <span className="text-4xl font-extrabold text-[#E8911A] tracking-tight leading-none">
                    {pressureNodes.p3.pressure.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-text-muted mt-1 uppercase tracking-wider">MPa</span>
                </div>
              </div>

            </div>
          </section>

          {/* Section 2: Node Device Health & Telemetry */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* P1 Health Card */}
            <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#F5F3EF] px-6 py-4 border-b border-border-light">
                <h4 className="text-base font-bold text-[#1B3A5C]">P1 Sensor Telemetry</h4>
              </div>
              <div className="p-6 space-y-4 text-base flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">बैटरी / Battery:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pipelineNodesHealth.p1.battery}%`, backgroundColor: getBatteryColor(pipelineNodesHealth.p1.battery) }} />
                      </div>
                      <span className="font-semibold">{pipelineNodesHealth.p1.battery}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">सिग्नल / Signal:</span>
                    <span className={getSignalColor(pipelineNodesHealth.p1.signal)}>{pipelineNodesHealth.p1.signal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">अपटाइम / Uptime:</span>
                    <span className="font-medium text-[#1B3A5C]">{pipelineNodesHealth.p1.uptime}</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-text-secondary text-xs">आखरी देखा / Last Seen:</span>
                  <span className="text-xs text-text-muted">{pipelineNodesHealth.p1.lastSeen}</span>
                </div>
              </div>
            </div>

            {/* P2 Health Card */}
            <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#F5F3EF] px-6 py-4 border-b border-border-light">
                <h4 className="text-base font-bold text-[#1B3A5C]">P2 Sensor Telemetry</h4>
              </div>
              <div className="p-6 space-y-4 text-base flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">बैटरी / Battery:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pipelineNodesHealth.p2.battery}%`, backgroundColor: getBatteryColor(pipelineNodesHealth.p2.battery) }} />
                      </div>
                      <span className="font-semibold">{pipelineNodesHealth.p2.battery}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">सिग्नल / Signal:</span>
                    <span className={getSignalColor(pipelineNodesHealth.p2.signal)}>{pipelineNodesHealth.p2.signal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">अपटाइम / Uptime:</span>
                    <span className="font-medium text-[#1B3A5C]">{pipelineNodesHealth.p2.uptime}</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-text-secondary text-xs">आखरी देखा / Last Seen:</span>
                  <span className="text-xs text-text-muted">{pipelineNodesHealth.p2.lastSeen}</span>
                </div>
              </div>
            </div>

            {/* P3 Health Card */}
            <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#F5F3EF] px-6 py-4 border-b border-border-light">
                <h4 className="text-base font-bold text-[#1B3A5C]">P3 Sensor Telemetry</h4>
              </div>
              <div className="p-6 space-y-4 text-base flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">बैटरी / Battery:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pipelineNodesHealth.p3.battery}%`, backgroundColor: getBatteryColor(pipelineNodesHealth.p3.battery) }} />
                      </div>
                      <span className="font-semibold text-[#B91C1C]">{pipelineNodesHealth.p3.battery}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">सिग्नल / Signal:</span>
                    <span className={getSignalColor(pipelineNodesHealth.p3.signal)}>{pipelineNodesHealth.p3.signal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">अपटाइम / Uptime:</span>
                    <span className="font-medium text-[#1B3A5C]">{pipelineNodesHealth.p3.uptime}</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-text-secondary text-xs">आखरी देखा / Last Seen:</span>
                  <span className="text-xs text-text-muted">{pipelineNodesHealth.p3.lastSeen}</span>
                </div>
              </div>
            </div>

          </section>

          {/* Section 3: Flow Rate Comparison Graph */}
          <section className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
            <div className="bg-[#F5F3EF] px-6 py-4 border-b border-border-light">
              <h3 className="text-sm font-bold text-[#1B3A5C]">
                प्रवाह दर तुलना (24 घंटे) / Flow Rate Comparison (24 Hours)
              </h3>
              <p className="text-[10px] text-text-muted font-medium uppercase tracking-wider mt-0.5">विभिन्न नोड्स पर पानी की मात्रा का प्रति घंटा विश्लेषण / Hourly volume analysis</p>
            </div>
            
            <div className="p-6">
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={flowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DC" />
                    <XAxis dataKey="time" fontSize={10} stroke="#888888" tickLine={false} />
                    <YAxis fontSize={10} stroke="#888888" tickLine={false} axisLine={false} label={{ value: 'L/min', angle: -90, position: 'insideLeft', fill: '#888888', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D4D0C8', borderRadius: '8px' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="p1" name="P1 — Start" stroke="#1B3A5C" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="p2" name="P2 — Middle" stroke="#E8911A" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="p3" name="P3 — Tail" stroke="#4A90B8" strokeWidth={2.5} dot={false} />
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

export default PipelineMonitor;
