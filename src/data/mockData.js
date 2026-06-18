/* ===== MOCK DATA — जल निगरानी / Jal Nigrani ===== */

/* ===== Village Data ===== */
export const villages = [
  {
    id: 'rampur',
    name: 'रामपुर / Rampur',
    status: 'safe',
    alerts: 0,
    jalBahini: 'सुनीता देवी / Sunita Devi',
    pressure: { p1: 0.25, p2: 0.18, p3: 0.10 },
    avgPressure: 0.21,
  },
  {
    id: 'sirhind',
    name: 'सिरहिंद / Sirhind',
    status: 'warning',
    alerts: 2,
    jalBahini: 'रमेश कुमार / Ramesh Kumar',
    pressure: { p1: 0.20, p2: 0.14, p3: 0.08 },
    avgPressure: 0.11,
    escalation: 'Auto-escalated to Mandal',
    issueNote: 'Pressure low at P3',
  },
  {
    id: 'fatehpur',
    name: 'फ़तेहपुर / Fatehpur',
    status: 'critical',
    alerts: 4,
    jalBahini: 'अनीता बाई / Anita Bai',
    pressure: { p1: 0.12, p2: 0.06, p3: 0.02 },
    avgPressure: 0.04,
    escalation: 'Auto-escalated to District',
    issueNote: 'Water unsafe — contamination detected',
  },
  {
    id: 'govindpur',
    name: 'गोविंदपुर / Govindpur',
    status: 'safe',
    alerts: 0,
    jalBahini: 'विक्रम सिंह / Vikram Singh',
    pressure: { p1: 0.28, p2: 0.22, p3: 0.15 },
    avgPressure: 0.23,
  },
  {
    id: 'lakhanpur',
    name: 'लखनपुर / Lakhanpur',
    status: 'warning',
    alerts: 1,
    jalBahini: 'माया देवी / Maya Devi',
    pressure: { p1: 0.22, p2: 0.17, p3: 0.09 },
    avgPressure: 0.16,
    issueNote: 'Stale data >1hr',
  },
  {
    id: 'chandpur',
    name: 'चांदपुर / Chandpur',
    status: 'safe',
    alerts: 0,
    jalBahini: 'दीपक झा / Deepak Jha',
    pressure: { p1: 0.24, p2: 0.19, p3: 0.12 },
    avgPressure: 0.11,
  },
];

/* ===== Pressure Nodes ===== */
export const initialPressureNodes = {
  p1: { id: 'P1', label: 'P1 — Pipeline Start', pressure: 0.25, status: 'normal', flowRate: 12 },
  p2: { id: 'P2', label: 'P2 — Midpoint', pressure: 0.18, status: 'normal', flowRate: 12 },
  p3: { id: 'P3', label: 'P3 — End of Tail', pressure: 0.10, status: 'low', flowRate: 10 },
};

/* ===== Water Quality Metrics ===== */
export const waterQualityMetrics = [
  { id: 'ph', label: 'pH Level', labelHi: 'पीएच स्तर', value: 7.2, unit: '', range: '6.5 - 8.5', status: 'safe', statusLabel: 'Safe' },
  { id: 'turbidity', label: 'Turbidity', labelHi: 'टर्बिडिटी', value: 2.5, unit: 'NTU', range: '< 5.0 NTU', status: 'safe', statusLabel: 'Safe' },
  { id: 'chlorine', label: 'Residual Chlorine', labelHi: 'अवशिष्ट क्लोरीन', value: 0.4, unit: 'mg/l', range: '0.2 - 0.5 mg/l', status: 'optimal', statusLabel: 'Optimal' },
  { id: 'tds', label: 'TDS', labelHi: 'टीडीएस', value: 350, unit: 'ppm', range: '< 500 ppm', status: 'good', statusLabel: 'Good' },
  { id: 'bacteria', label: 'Bacterial Count', labelHi: 'जीवाणु गणना', value: 'Absent', unit: '', range: 'Zero E. coli', status: 'safe', statusLabel: 'Safe' },
];

/* ===== Active Alerts ===== */
export const initialAlerts = [
  {
    id: 1,
    severity: 'warning',
    description: 'P2 pressure drop detected',
    descriptionHi: 'P2 दबाव गिरावट का पता चला',
    timestamp: '10:15 AM',
    escalation: 'WhatsApp sent to Panchayat ✓',
    acknowledged: false,
    village: 'रामपुर / Rampur',
  },
  {
    id: 2,
    severity: 'critical',
    description: 'Low battery at P3 node',
    descriptionHi: 'P3 नोड पर बैटरी कम',
    timestamp: '09:45 AM',
    detail: 'Voltage: 3.1V (Critical threshold 3.0V)',
    escalation: null,
    acknowledged: false,
    village: 'रामपुर / Rampur',
  },
  {
    id: 3,
    severity: 'info',
    description: 'Flow rate fluctuation P1',
    descriptionHi: 'P1 प्रवाह दर में उतार-चढ़ाव',
    timestamp: '08:30 AM',
    escalation: null,
    acknowledged: true,
    village: 'रामपुर / Rampur',
  },
];

/* District-level alerts for officer view */
export const districtAlerts = [
  { id: 101, severity: 'critical', village: 'फ़तेहपुर / Fatehpur', description: 'Water contamination — bacterial count high', timestamp: '09:00 AM', escalation: 'Escalated to District 09:15 AM' },
  { id: 102, severity: 'critical', village: 'फ़तेहपुर / Fatehpur', description: 'pH level critical — 5.2', timestamp: '08:55 AM', escalation: 'Escalated to District 09:15 AM' },
  { id: 103, severity: 'warning', village: 'सिरहिंद / Sirhind', description: 'Pressure drop at P3 — 0.08 MPa', timestamp: '10:00 AM', escalation: 'Escalated to Mandal 10:10 AM' },
  { id: 104, severity: 'warning', village: 'सिरहिंद / Sirhind', description: 'Flow rate below threshold', timestamp: '09:30 AM', escalation: null },
  { id: 105, severity: 'critical', village: 'फ़तेहपुर / Fatehpur', description: 'Gateway offline', timestamp: '08:40 AM', escalation: 'Escalated to District 09:15 AM' },
  { id: 106, severity: 'warning', village: 'लखनपुर / Lakhanpur', description: 'Stale data — no update in 1.5 hours', timestamp: '09:00 AM', escalation: null },
  { id: 107, severity: 'critical', village: 'फ़तेहपुर / Fatehpur', description: 'Residual chlorine absent', timestamp: '08:50 AM', escalation: 'Escalated to District 09:15 AM' },
];

/* ===== 24-Hour Pressure Trend Data ===== */
export const generate24HourPressureData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const hour = time.getHours();
    const isSupplyHour = (hour >= 6 && hour <= 10) || (hour >= 16 && hour <= 20);
    const baseP1 = isSupplyHour ? 0.28 : 0.18;
    const baseP2 = isSupplyHour ? 0.22 : 0.14;
    const baseP3 = isSupplyHour ? 0.14 : 0.08;

    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      p1: +(baseP1 + (Math.random() - 0.5) * 0.06).toFixed(3),
      p2: +(baseP2 + (Math.random() - 0.5) * 0.05).toFixed(3),
      p3: +(baseP3 + (Math.random() - 0.5) * 0.04).toFixed(3),
    });
  }
  return data;
};

/* ===== 30-Day Turbidity Trend Data ===== */
export const generate30DayTurbidityData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 86400000);
    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'short' });
    const isAnomaly = i === 12;
    const value = isAnomaly
      ? +(5.5 + Math.random() * 1.5).toFixed(1)
      : +(1.5 + Math.random() * 2.0).toFixed(1);

    data.push({
      date: `${month} ${day}`,
      value,
      isAnomaly,
      safetyLimit: 5.0,
    });
  }
  return data;
};

/* ===== Recent Test Results ===== */
export const recentTestResults = [
  { date: '15 Jun 2026', time: '10:30 AM', parameter: 'pH', parameterHi: 'पीएच', value: '7.2', unit: '', status: 'safe' },
  { date: '15 Jun 2026', time: '10:30 AM', parameter: 'Turbidity', parameterHi: 'टर्बिडिटी', value: '2.5', unit: 'NTU', status: 'safe' },
  { date: '15 Jun 2026', time: '10:30 AM', parameter: 'Chlorine', parameterHi: 'क्लोरीन', value: '0.4', unit: 'mg/l', status: 'optimal' },
  { date: '14 Jun 2026', time: '10:00 AM', parameter: 'pH', parameterHi: 'पीएच', value: '7.1', unit: '', status: 'safe' },
  { date: '14 Jun 2026', time: '10:00 AM', parameter: 'TDS', parameterHi: 'टीडीएस', value: '345', unit: 'ppm', status: 'good' },
  { date: '13 Jun 2026', time: '09:45 AM', parameter: 'Bacterial Count', parameterHi: 'जीवाणु', value: 'Absent', unit: '', status: 'safe' },
  { date: '13 Jun 2026', time: '09:45 AM', parameter: 'Turbidity', parameterHi: 'टर्बिडिटी', value: '2.8', unit: 'NTU', status: 'safe' },
  { date: '12 Jun 2026', time: '10:15 AM', parameter: 'pH', parameterHi: 'पीएच', value: '7.3', unit: '', status: 'safe' },
];

/* ===== Comparative Village Pressure Data ===== */
export const comparativeVillageData = [
  { name: 'Rampur', nameHi: 'रामपुर', pressure: 0.21, status: 'safe' },
  { name: 'Sirhind', nameHi: 'सिरहिंद', pressure: 0.11, status: 'warning' },
  { name: 'Fatehpur', nameHi: 'फ़तेहपुर', pressure: 0.04, status: 'critical' },
  { name: 'Govindpur', nameHi: 'गोविंदपुर', pressure: 0.23, status: 'safe' },
  { name: 'Lakhanpur', nameHi: 'लखनपुर', pressure: 0.16, status: 'warning' },
  { name: 'Chandpur', nameHi: 'चांदपुर', pressure: 0.11, status: 'safe' },
];

/* ===== Pipeline Nodes Health ===== */
export const pipelineNodesHealth = {
  p1: { battery: 92, signal: 'Strong / मजबूत', uptime: '14d 6h', lastSeen: '2 mins ago / २ मिनट पहले' },
  p2: { battery: 85, signal: 'Good / अच्छा', uptime: '14d 6h', lastSeen: '5 mins ago / ५ मिनट पहले' },
  p3: { battery: 24, signal: 'Weak / कमजोर', uptime: '8d 2h', lastSeen: '1 min ago / १ मिनट पहले' }, // warning/critical battery
};

/* ===== Default Settings Preferences ===== */
export const initialSettings = {
  pressureThresholdMin: 0.05,
  pressureThresholdMax: 0.35,
  flowThresholdMin: 5,
  flowThresholdMax: 20,
  batteryThresholdMin: 20,
  notificationSms: true,
  notificationWhatsApp: true,
  language: 'hi',
  refreshInterval: 15,
};

/* ===== 24-Hour Flow Rate Trend Data ===== */
export const generate24HourFlowData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const hour = time.getHours();
    const isSupplyHour = (hour >= 6 && hour <= 10) || (hour >= 16 && hour <= 20);
    const baseF1 = isSupplyHour ? 12.0 : 2.0;
    const baseF2 = isSupplyHour ? 11.5 : 1.8;
    const baseF3 = isSupplyHour ? 8.2 : 0.5;

    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      p1: +(baseF1 + (Math.random() - 0.5) * 1.5).toFixed(1),
      p2: +(baseF2 + (Math.random() - 0.5) * 1.5).toFixed(1),
      p3: +(baseF3 + (Math.random() - 0.5) * 1.0).toFixed(1),
    });
  }
  return data;
};

