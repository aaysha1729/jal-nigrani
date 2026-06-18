import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ReportIssueModal from '../components/ReportIssueModal';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';
import useLiveData from '../hooks/useLiveData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  CartesianGrid,
  Tooltip
} from 'recharts';

const MetricTile = ({ metric }) => {
  const getBorderColor = () => {
    if (metric.status === 'safe') return '#16A34A';
    if (metric.status === 'warning') return '#F59E0B';
    return '#DC2626';
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: 290,
      borderRadius: 18,
      border: '1px solid #E5E7EB',
      borderLeft: `5px solid ${getBorderColor()}`,
      backgroundColor: '#FFFFFF',
      padding: '32px 24px',
      boxShadow: '0 4px 20px rgba(15,23,42,0.01)',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: "'Inter', sans-serif" }}>
              {metric.label}
            </p>
            {metric.isLive && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 999,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  display: 'inline-block'
                }} />
                Live
              </span>
            )}
          </div>
          <StatusBadge status={metric.status} label={metric.statusLabel} />
        </div>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 56, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{metric.value}</span>
            {metric.unit && <span style={{ fontSize: 18, fontWeight: 600, color: '#64748B', marginLeft: 2 }}>{metric.unit}</span>}
          </div>
          {metric.isLive && metric.timestamp && (
            <span style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, fontWeight: 500 }}>
              Last updated: {metric.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
      </div>
      
      {/* Threshold details */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid #F1F5F9', paddingTop: 12, fontSize: 13, color: '#64748B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ flexShrink: 0 }}>Good:</span>
          <span style={{ fontWeight: 600, color: '#334155', textAlign: 'right' }}>{metric.good}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ flexShrink: 0 }}>Acceptable:</span>
          <span style={{ fontWeight: 600, color: '#334155', textAlign: 'right' }}>{metric.acceptable}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ flexShrink: 0 }}>Alert:</span>
          <span style={{ fontWeight: 600, color: '#DC2626', textAlign: 'right' }}>{metric.alert}</span>
        </div>
      </div>
    </div>
  );
};

const ReportsPage = () => {
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedParam, setSelectedParam] = useState('pH');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('30 Days');
  const [tableSearch, setTableSearch] = useState('');
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { tds, lastUpdated } = useLiveData();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const wqi = useMemo(() => {
    const diff = Math.round((280 - tds) / 15);
    return Math.min(95, Math.max(65, 82 + diff));
  }, [tds]);

  // 4 Sensor Cards configuration with exact thresholds requested
  const sensorCards = useMemo(() => [
    {
      id: 'ph',
      label: 'pH',
      value: 7.2,
      unit: '',
      status: 'safe',
      statusLabel: 'Safe',
      good: '7.0–8.0',
      acceptable: '6.5–8.5',
      alert: '<6.5 or >8.5',
    },
    {
      id: 'turbidity',
      label: 'Turbidity',
      value: 2.5,
      unit: 'NTU',
      status: 'warning',
      statusLabel: 'Acceptable',
      good: '<1 NTU',
      acceptable: '1–5 NTU',
      alert: '>5 NTU',
    },
    {
      id: 'orp',
      label: 'ORP',
      value: 620,
      unit: 'mV',
      status: 'warning',
      statusLabel: 'Acceptable',
      good: '>650 mV',
      acceptable: '550–650 mV',
      alert: '<550 mV',
    },
    {
      id: 'tds',
      label: 'TDS',
      value: tds,
      unit: 'ppm',
      status: tds > 2000 ? 'critical' : tds >= 500 ? 'warning' : 'safe',
      statusLabel: tds > 2000 ? 'Alert' : tds >= 500 ? 'Acceptable' : 'Safe',
      good: '<500 ppm',
      acceptable: '500–2000 ppm',
      alert: '>2000 ppm',
      isLive: true,
      timestamp: lastUpdated,
    }
  ], [tds, lastUpdated]);

  // Parameter Charts configuration with correct color limits and thick lines
  const paramConfigs = {
    pH: {
      yDomain: [6.0, 9.0],
      unit: '',
      refLines: [
        { y: 6.5, stroke: '#DC2626', label: 'Alert Min (6.5)' },
        { y: 8.5, stroke: '#DC2626', label: 'Alert Max (8.5)' }
      ],
      getBarColor: (val) => (val < 6.5 || val > 8.5 ? '#DC2626' : val < 7.0 || val > 8.0 ? '#F59E0B' : '#16A34A')
    },
    Turbidity: {
      yDomain: [0, 6],
      unit: ' NTU',
      refLines: [
        { y: 5.0, stroke: '#DC2626', label: 'Alert (>5.0)' },
        { y: 1.0, stroke: '#F59E0B', label: 'Good (<1.0)' }
      ],
      getBarColor: (val) => (val > 5.0 ? '#DC2626' : val >= 1.0 ? '#F59E0B' : '#16A34A')
    },
    ORP: {
      yDomain: [500, 750],
      unit: ' mV',
      refLines: [
        { y: 550, stroke: '#DC2626', label: 'Alert (<550)' },
        { y: 650, stroke: '#16A34A', label: 'Good (>650)' }
      ],
      getBarColor: (val) => (val < 550 ? '#DC2626' : val <= 650 ? '#F59E0B' : '#16A34A')
    },
    TDS: {
      yDomain: [0, 600],
      unit: ' ppm',
      refLines: [
        { y: 500, stroke: '#F59E0B', label: 'Acceptable (500)' }
      ],
      getBarColor: (val) => (val > 2000 ? '#DC2626' : val >= 500 ? '#F59E0B' : '#16A34A')
    }
  };

  // Generate trend data dynamically based on the exact ranges requested
  const trendData = useMemo(() => {
    const data = [];
    const now = new Date();
    
    let count = 30;
    let intervalLabel = 'day';
    if (selectedTimeFilter === '24 Hours') {
      count = 24;
      intervalLabel = 'hour';
    } else if (selectedTimeFilter === '7 Days') {
      count = 7;
      intervalLabel = 'day';
    } else {
      count = 30;
      intervalLabel = 'day';
    }

    // Use a seeded-style random so values are stable per render
    // but spread across threshold boundaries for visible multi-color bars
    const seed = selectedParam.charCodeAt(0) + selectedTimeFilter.length;
    const pseudoRandom = (i) => {
      const x = Math.sin(seed * 9301 + i * 49297) * 0.5 + 0.5;
      return x;
    };

    for (let i = count - 1; i >= 0; i--) {
      let dateStr = '';
      if (intervalLabel === 'hour') {
        const time = new Date(now.getTime() - i * 3600000);
        const hour = time.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        dateStr = `${displayHour} ${ampm}`;
      } else {
        const date = new Date(now.getTime() - i * 86400000);
        const day = date.getDate();
        const month = date.toLocaleString('en', { month: 'short' });
        dateStr = `${month} ${day}`;
      }

      let value = 0;
      const r = pseudoRandom(i);
      
      if (selectedParam === 'pH') {
        // Spread across Good (7.0-8.0), Acceptable (6.5-7.0 / 8.0-8.5), rare Alert
        if (r < 0.55) value = +(7.0 + r * 1.8).toFixed(2);         // Good
        else if (r < 0.85) value = +(6.5 + (r - 0.55) * 1.67).toFixed(2); // Acceptable low
        else value = +(8.5 + (r - 0.85) * 1.0).toFixed(2);         // Alert high
      } else if (selectedParam === 'Turbidity') {
        // Spread across Good (<1), Acceptable (1-5), rare Alert (>5)
        if (r < 0.4) value = +(0.2 + r * 2.0).toFixed(1);          // Good
        else if (r < 0.85) value = +(1.0 + (r - 0.4) * 8.9).toFixed(1); // Acceptable
        else value = +(5.1 + (r - 0.85) * 3.0).toFixed(1);         // Alert
      } else if (selectedParam === 'ORP') {
        // Spread across Good (>650), Acceptable (550-650), rare Alert (<550)
        if (r < 0.45) value = Math.round(655 + r * 90);            // Good
        else if (r < 0.85) value = Math.round(550 + (r - 0.45) * 250); // Acceptable
        else value = Math.round(510 + (r - 0.85) * 260);           // Alert
      } else if (selectedParam === 'TDS') {
        // Spread across Good (<500), Acceptable (500-2000), rare Alert (>2000)
        if (r < 0.5) value = Math.round(180 + r * 640);            // Good
        else if (r < 0.85) value = Math.round(500 + (r - 0.5) * 4286); // Acceptable
        else value = Math.round(2010 + (r - 0.85) * 1200);         // Alert
      }

      data.push({
        date: dateStr,
        value,
      });
    }

    // Anchor last value for exact match with current reading
    if (data.length > 0) {
      const last = data[data.length - 1];
      if (selectedParam === 'pH') last.value = 7.2;
      else if (selectedParam === 'Turbidity') last.value = 2.5;
      else if (selectedParam === 'ORP') last.value = 620;
      else if (selectedParam === 'TDS') last.value = tds;
    }

    return data;
  }, [selectedParam, selectedTimeFilter, tds]);

  // Recent Measurements Table rows
  const recentTestResultsRows = useMemo(() => [
    { date: '31 Oct 2023', time: '10:30 AM', parameter: 'pH', value: '7.2', status: 'safe', statusLabel: 'Safe' },
    { date: '31 Oct 2023', time: '10:30 AM', parameter: 'Turbidity', value: '2.5 NTU', status: 'warning', statusLabel: 'Acceptable' },
    { date: '31 Oct 2023', time: '10:30 AM', parameter: 'ORP', value: '620 mV', status: 'warning', statusLabel: 'Acceptable' },
    { date: '31 Oct 2023', time: '10:30 AM', parameter: 'TDS', value: `${tds} ppm`, status: tds > 2000 ? 'critical' : tds >= 500 ? 'warning' : 'safe', statusLabel: tds > 2000 ? 'Alert' : tds >= 500 ? 'Acceptable' : 'Safe' }
  ], [tds]);

  // Dynamic filter for search
  const filteredRows = useMemo(() => {
    return recentTestResultsRows.filter(row => 
      row.parameter.toLowerCase().includes(tableSearch.toLowerCase()) ||
      row.statusLabel.toLowerCase().includes(tableSearch.toLowerCase())
    );
  }, [tableSearch, recentTestResultsRows]);

  const currentConfig = paramConfigs[selectedParam];

  // Custom high-readability tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      let unit = '';
      let statusLabel = 'Good';
      let statusColor = '#4ADE80';
      const val = data.value;
      
      if (selectedParam === 'pH') {
        unit = '';
        if (val < 6.5 || val > 8.5) { statusLabel = 'Alert'; statusColor = '#F87171'; }
        else if (val < 7.0 || val > 8.0) { statusLabel = 'Acceptable'; statusColor = '#FBBF24'; }
        else { statusLabel = 'Good'; statusColor = '#4ADE80'; }
      } else if (selectedParam === 'Turbidity') {
        unit = ' NTU';
        if (val > 5.0) { statusLabel = 'Alert'; statusColor = '#F87171'; }
        else if (val >= 1.0) { statusLabel = 'Acceptable'; statusColor = '#FBBF24'; }
        else { statusLabel = 'Good'; statusColor = '#4ADE80'; }
      } else if (selectedParam === 'ORP') {
        unit = ' mV';
        if (val < 550) { statusLabel = 'Alert'; statusColor = '#F87171'; }
        else if (val <= 650) { statusLabel = 'Acceptable'; statusColor = '#FBBF24'; }
        else { statusLabel = 'Good'; statusColor = '#4ADE80'; }
      } else if (selectedParam === 'TDS') {
        unit = ' ppm';
        if (val > 2000) { statusLabel = 'Alert'; statusColor = '#F87171'; }
        else if (val >= 500) { statusLabel = 'Acceptable'; statusColor = '#FBBF24'; }
        else { statusLabel = 'Good'; statusColor = '#4ADE80'; }
      }

      return (
        <div style={{
          backgroundColor: '#1E2530',
          borderRadius: 12,
          padding: '20px 24px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          fontSize: 16,
          lineHeight: 1.8,
          minWidth: 260,
          color: '#FFFFFF',
          whiteSpace: 'nowrap'
        }}>
          <p style={{ margin: 0, fontWeight: 700, borderBottom: '1px solid #334155', paddingBottom: 8, marginBottom: 10, color: '#FFFFFF' }}>
            Date: {data.date}
          </p>
          <p style={{ margin: '4px 0', color: '#FFFFFF' }}>Parameter: {selectedParam}</p>
          <p style={{ margin: '4px 0', color: '#FFFFFF' }}>Value: {val}{unit}</p>
          <p style={{ margin: '4px 0', color: '#FFFFFF' }}>
            Status: <span style={{ color: statusColor, fontWeight: 700 }}>{statusLabel}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif" }}>
      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <nav style={{ fontSize: 14, fontWeight: 500, color: '#64748B', marginBottom: 16 }}>
              <span>Home</span>
              <span style={{ margin: '0 8px' }}>&gt;</span>
              <span>Reports</span>
              <span style={{ margin: '0 8px' }}>&gt;</span>
              <span style={{ color: '#0F172A', fontWeight: 600 }}>Water Quality</span>
            </nav>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 44, fontWeight: 500, color: '#0F172A', marginBottom: 0, lineHeight: 1.1 }}>
              Water Quality Report – Village Ramnagar
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 12, height: 44 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', padding: '0 18px', fontSize: 13, fontWeight: 600, color: '#0F172A', borderRadius: 8 }}>
              <svg style={{ width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Oct 01 - Oct 31, 2023
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#0F172A', border: 'none', padding: '0 20px', fontSize: 13, fontWeight: 600, color: '#FFFFFF', borderRadius: 8, cursor: 'pointer' }}>
              <svg style={{ width: 14, height: 14, fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>


        {/* 5-Card Metrics Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 28 }}>
          {/* 4 Sensor Cards */}
          {sensorCards.map((metric) => (
            <MetricTile key={metric.id} metric={metric} />
          ))}

          {/* Water Quality Index Card - Consistent with WQI 70-84 -> MONITOR */}
          <div style={{
            position: 'relative',
            minHeight: 290,
            borderRadius: 18,
            border: '1px solid #E5E7EB',
            borderLeft: `5px solid ${wqi >= 85 ? '#16A34A' : wqi >= 70 ? '#F59E0B' : '#DC2626'}`,
            backgroundColor: '#FFFFFF',
            padding: '32px 24px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.01)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Water Quality Index</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  backgroundColor: wqi >= 85 ? '#F0FDF4' : wqi >= 70 ? '#FFFBEB' : '#FEF2F2',
                  border: `1px solid ${wqi >= 85 ? '#16A34A' : wqi >= 70 ? '#D97706' : '#DC2626'}`,
                  color: wqi >= 85 ? '#16A34A' : wqi >= 70 ? '#D97706' : '#DC2626'
                }}>{wqi >= 85 ? 'SAFE' : wqi >= 70 ? 'MONITOR' : 'ALERT'}</span>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ fontSize: 56, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{wqi}</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#64748B', marginLeft: 2 }}>/ 100</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, fontSize: 15, color: '#64748B', marginTop: 12 }}>
              <strong>Reason:</strong> {wqi >= 85 ? 'All parameters within standard safety limits.' : 'ORP and Turbidity approaching threshold limits.'}
            </div>
          </div>
        </section>

        {/* Dynamic Trends Section */}
        <section style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {selectedParam} Trends
              </h3>
              
              {/* Legend Block */}
              <div style={{ display: 'flex', gap: 20, fontSize: 13, fontWeight: 600, color: '#64748B', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block' }}></span>
                  Green = Good / Safe
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block' }}></span>
                  Yellow = Acceptable / Monitor
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#DC2626', display: 'inline-block' }}></span>
                  Red = Alert
                </span>
              </div>
            </div>

            {/* Selectors Row */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {/* Parameter Selector */}
              <div style={{ display: 'flex', gap: 6, backgroundColor: '#FAF9F6', padding: 4, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                {['pH', 'Turbidity', 'ORP', 'TDS'].map((param) => (
                  <button
                    key={param}
                    onClick={() => setSelectedParam(param)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: 'none',
                      backgroundColor: selectedParam === param ? '#0F172A' : 'transparent',
                      color: selectedParam === param ? '#FFFFFF' : '#64748B',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {param}
                  </button>
                ))}
              </div>

              {/* Time Selector */}
              <div style={{ display: 'flex', gap: 6, backgroundColor: '#FAF9F6', padding: 4, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                {['24 Hours', '7 Days', '30 Days'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedTimeFilter(filter)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: 'none',
                      backgroundColor: selectedTimeFilter === filter ? '#64748B' : 'transparent',
                      color: selectedTimeFilter === filter ? '#FFFFFF' : '#64748B',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ height: 380, width: '100%', paddingLeft: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ left: 10, right: 10, top: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#E5E7EB' }} style={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} />
                <YAxis domain={currentConfig.yDomain} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} style={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} />
                <Tooltip content={<CustomTooltip />} />
                {currentConfig.refLines.map((ref, idx) => (
                  <ReferenceLine
                     key={idx}
                     y={ref.y}
                     stroke={ref.stroke}
                     strokeWidth={3}
                     strokeDasharray="5 5"
                     label={{ value: ref.label, fill: ref.stroke, position: 'top', fontSize: 11, fontWeight: 800 }}
                  />
                ))}
                <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={selectedTimeFilter === '24 Hours' ? 14 : selectedTimeFilter === '7 Days' ? 44 : 18}>
                  {trendData.map((entry, index) => (
                    <Cell key={index} fill={currentConfig.getBarColor(entry.value)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recent Test Results Section */}
        <section style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
          <div style={{ display: 'flex', justifycontent: 'space-between', alignitems: 'center', padding: 24, borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>Recent Measurements</h3>
              <span style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Last Updated: Just now</span>
            </div>
            <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', borderRadius: 8, height: 40, padding: '0 14px', backgroundColor: '#FAF9F6' }}>
                <svg style={{ width: 14, height: 14, color: '#94A3B8' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: 13, color: '#0F172A', width: 220 }} 
                  placeholder="Filter by parameter or status..." 
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                />
              </label>
              <button 
                onClick={() => setReportOpen(true)}
                style={{ backgroundColor: '#0F172A', border: 'none', borderRadius: 8, color: '#FFFFFF', fontSize: 13, fontWeight: 600, padding: '0 16px', cursor: 'pointer', height: 40 }}
              >
                Report Quality Issue
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 16 }}>
              <thead>
                <tr style={{ backgroundColor: '#FAF9F6', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '24px 24px', fontWeight: 700, color: '#0F172A' }}>Date</th>
                  <th style={{ padding: '24px 24px', fontWeight: 700, color: '#0F172A' }}>Time</th>
                  <th style={{ padding: '24px 24px', fontWeight: 700, color: '#0F172A' }}>Parameter</th>
                  <th style={{ padding: '24px 24px', fontWeight: 700, color: '#0F172A' }}>Value</th>
                  <th style={{ padding: '24px 24px', fontWeight: 700, color: '#0F172A' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr key={`${row.parameter}-${idx}`} style={{ borderBottom: '1px solid #E5E7EB', transition: 'background-color 0.15s ease' }}>
                    <td style={{ padding: '24px 24px', color: '#64748B' }}>{row.date}</td>
                    <td style={{ padding: '24px 24px', color: '#64748B' }}>{row.time}</td>
                    <td style={{ padding: '24px 24px', fontWeight: 600, color: '#0F172A' }}>{row.parameter}</td>
                    <td style={{ padding: '24px 24px', color: '#0F172A', fontWeight: 500 }}>{row.value}</td>
                    <td style={{ padding: '24px 24px' }}>
                      <StatusBadge status={row.status} label={row.statusLabel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <CommonFooter />

      <ReportIssueModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </div>
  );
};

export default ReportsPage;
