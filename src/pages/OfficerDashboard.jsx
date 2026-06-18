import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';

// Icons
const HomeIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AlertTriangleIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const BellIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ClockIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SearchIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ActivityIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const BatteryIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="11" x2="23" y2="13" />
  </svg>
);

// Translation Dictionary
const TRANSLATIONS = {
  en: {
    title: "District Dashboard",
    districtName: "Mewat District",
    villagesMonitoredPill: "12 villages monitored",
    lastRefreshed: "Last refreshed: Today, 10:45 AM",
    logout: "Logout",
    
    // Stats
    statVillagesMonitored: "Villages Monitored",
    statActiveIssues: "Active Issues",
    statUnacknowledged: "Unacknowledged",
    statStaleData: "Gateway Status",
    statStaleDataVal: "ON",

    // Section Titles
    villageSummaries: "Village Summaries",
    districtAlerts: "District Alerts",
    averagePressure: "Average Pressure",
    viewAll: "View All",

    // Village Statuses
    safe: "Safe",
    warning: "Warning",
    critical: "Critical",
    alertsCount: "Alerts",
    noAlerts: "0 Alerts",
    sync: "Sync",
    jalBandhu: "JAL BANDHU",

    // Alerts details
    fatehpurAlertTitle: "Fatehpur — Water quality critical",
    fatehpurAlertDesc: "TDS exceeded 2000ppm at Main",
    sirhindAlertTitle: "Sirhind — P3 pressure drop",
    sirhindAlertDesc: "Below 1.2 bar for 45 mins",
    lakhanpurAlertTitle: "Lakhanpur — Data Lag",
    lakhanpurAlertDesc: "No signal since 09:15 AM",
    autoEscalated: "Sent to District: 10:45 AM",
    escalated: "Escalated",
    mandalReview: "Mandal Review",
    pingSent: "Ping Sent",
    
    // Search & Filter
    searchPlaceholder: "Search villages by name...",
    filterAll: "All Villages",
    filterSafe: "Safe",
    filterWarning: "Warnings",
    filterCritical: "Critical",

    // Modal
    modalTitle: "Village Operational Status",
    modalSafeMsg: "Village network operating within nominal safety parameters.",
    modalAlertsActive: "Active Alerts",
    sensorReadings: "Live Sensor Readings",
    pressure: "Pressure",
    flowRate: "Flow Rate",
    waterQuality: "Water Quality (TDS)",
    batteryStatus: "Battery Level",
    actionPing: "Send Ping to Operator",
    actionDispatch: "Dispatch Repair Crew",
    closeDetails: "Close Details",
    operatorRole: "Assigned Area Operator",
    phone: "Phone",
  },
  hi: {
    title: "जिला निगरानी",
    districtName: "मेवात जिला",
    villagesMonitoredPill: "12 गांवों की निगरानी",
    lastRefreshed: "अंतिम बार ताज़ा किया गया: आज, 10:45 AM",
    logout: "लॉगआउट",

    // Stats
    statVillagesMonitored: "कुल निगरानी वाले गांव",
    statActiveIssues: "सक्रिय समस्याएं",
    statUnacknowledged: "बिना स्वीकार किए गए",
    statStaleData: "गेटवे स्थिति",
    statStaleDataVal: "चालू",

    // Section Titles
    villageSummaries: "ग्राम अवलोकन",
    districtAlerts: "जिला अलर्ट",
    averagePressure: "औसत दबाव",
    viewAll: "सभी देखें",

    // Village Statuses
    safe: "सुरक्षित",
    warning: "चेतावनी",
    critical: "गंभीर",
    alertsCount: "अलर्ट",
    noAlerts: "0 अलर्ट",
    sync: "समय",
    jalBandhu: "जल बंधु",

    // Alerts details
    fatehpurAlertTitle: "फतेहपुर — पानी की गुणवत्ता गंभीर",
    fatehpurAlertDesc: "मुख्य स्थान पर टीडीएस 2000 पीपीएम से अधिक",
    sirhindAlertTitle: "सरहिंद — P3 दबाव में गिरावट",
    sirhindAlertDesc: "45 मिनट के लिए दबाव 1.2 बार से नीचे",
    lakhanpurAlertTitle: "लखनपुर — डेटा अंतराल",
    lakhanpurAlertDesc: "सुबह 09:15 बजे से कोई संकेत नहीं",
    autoEscalated: "जिला स्तर पर भेजा गया: 10:45 AM",
    escalated: "प्रेषित",
    mandalReview: "मंडल समीक्षा",
    pingSent: "पिंग भेजा गया",
    
    // Search & Filter
    searchPlaceholder: "नाम से गांव खोजें...",
    filterAll: "सभी गांव",
    filterSafe: "सुरक्षित",
    filterWarning: "चेतावनी",
    filterCritical: "गंभीर",

    // Modal
    modalTitle: "ग्राम परिचालन स्थिति",
    modalSafeMsg: "ग्राम नेटवर्क सामान्य सुरक्षा मापदंडों के भीतर काम कर रहा है।",
    modalAlertsActive: "सक्रिय अलर्ट",
    sensorReadings: "लाइव सेंसर रीडिंग",
    pressure: "दबाव",
    flowRate: "प्रवाह दर",
    waterQuality: "पानी की गुणवत्ता (टीडीएस)",
    batteryStatus: "बैटरी स्तर",
    actionPing: "ऑपरेटर को पिंग भेजें",
    actionDispatch: "मरम्मत दल भेजें",
    closeDetails: "विवरण बंद करें",
    operatorRole: "नियुक्त क्षेत्र ऑपरेटर",
    phone: "फोन",
  }
};

export default function OfficerDashboard() {
  const { lang } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // 6 Villages detailed mock data
  const villages = [
    {
      id: 'rampur',
      name: 'Rampur',
      nameHi: 'रामपुर',
      status: 'Safe',
      statusColor: '#10B981',
      syncTime: '10:30 AM',
      operator: 'Sunita Devi',
      operatorHi: 'सुनीता देवी',
      phone: '+91 98765-43210',
      alerts: 0,
      alertMsg: '',
      pressure: 0.28, // MPa
      flow: 22, // L/min
      tds: 280, // ppm
      ph: 7.2,
      battery: 85,
    },
    {
      id: 'sirhind',
      name: 'Sirhind',
      nameHi: 'सरहिंद',
      status: 'Warning',
      statusColor: '#D97706',
      syncTime: '10:25 AM',
      operator: 'Ramesh Kumar',
      operatorHi: 'रमेश कुमार',
      phone: '+91 98765-43211',
      alerts: 2,
      alertMsg: lang === 'en' ? '2 alerts: Low P3' : '2 अलर्ट: निम्न P3',
      alertMsgFull: lang === 'en' ? 'Sirhind — P3 pressure drop (Below 1.2 bar for 45 mins)' : 'सरहिंद — P3 दबाव में गिरावट (45 मिनट के लिए दबाव 1.2 बार से नीचे)',
      pressure: 0.12, // MPa (Low)
      flow: 18, // L/min
      tds: 340, // ppm
      ph: 6.9,
      battery: 74,
    },
    {
      id: 'fatehpur',
      name: 'Fatehpur',
      nameHi: 'फतेहपुर',
      status: 'Critical',
      statusColor: '#EF4444',
      syncTime: '10:15 AM',
      operator: 'Anita Bai',
      operatorHi: 'अनीता बाई',
      phone: '+91 98765-43212',
      alerts: 4,
      alertMsg: lang === 'en' ? '4 alerts: Unsafe' : '4 अलर्ट: असुरक्षित',
      alertMsgFull: lang === 'en' ? 'Fatehpur — Water quality critical (TDS exceeded 2000ppm at Main)' : 'फतेहपुर — पानी की गुणवत्ता गंभीर (मुख्य स्थान पर टीडीएस 2000 पीपीएम से अधिक)',
      pressure: 0.04, // MPa (Critical Low)
      flow: 14, // L/min
      tds: 2250, // ppm (Critical TDS)
      ph: 8.1,
      battery: 18, // Low Battery
    },
    {
      id: 'govindpur',
      name: 'Govindpur',
      nameHi: 'गोविंदपुर',
      status: 'Safe',
      statusColor: '#10B981',
      syncTime: '10:20 AM',
      operator: 'Vikram Singh',
      operatorHi: 'विक्रम सिंह',
      phone: '+91 98765-43213',
      alerts: 0,
      alertMsg: '',
      pressure: 0.26, // MPa
      flow: 20, // L/min
      tds: 310, // ppm
      ph: 7.4,
      battery: 92,
    },
    {
      id: 'lakhanpur',
      name: 'Lakhanpur',
      nameHi: 'लखनपुर',
      status: 'Warning',
      statusColor: '#D97706',
      syncTime: '09:15 AM',
      operator: 'Maya Devi',
      operatorHi: 'माया देवी',
      phone: '+91 98765-43214',
      alerts: 1,
      alertMsg: lang === 'en' ? 'No Signal' : 'सिग्नल नहीं',
      alertMsgFull: lang === 'en' ? 'Lakhanpur — Data Lag (No signal since 09:15 AM)' : 'लखनपुर — डेटा अंतराल (सुबह 09:15 बजे से कोई संकेत नहीं)',
      pressure: 0.18, // MPa
      flow: 0, // L/min (No flow)
      tds: 420, // ppm
      ph: 7.0,
      battery: 2, // Critical battery
    },
    {
      id: 'chandpur',
      name: 'Chandpur',
      nameHi: 'चांदपुर',
      status: 'Safe',
      statusColor: '#10B981',
      syncTime: '10:30 AM',
      operator: 'Deepak Jha',
      operatorHi: 'दीपक झा',
      phone: '+91 98765-43215',
      alerts: 0,
      alertMsg: '',
      pressure: 0.27, // MPa
      flow: 24, // L/min
      tds: 190, // ppm
      ph: 7.1,
      battery: 88,
    }
  ];

  // District Alerts list (bottom left)
  const districtAlertsList = [
    {
      id: 1,
      village: 'Fatehpur',
      villageHi: 'फतेहपुर',
      title: t.fatehpurAlertTitle,
      desc: t.fatehpurAlertDesc,
      severity: 'High',
      severityColor: '#EF4444',
      status: t.escalated,
      time: '10:45 AM',
    },
    {
      id: 2,
      village: 'Sirhind',
      villageHi: 'सरहिंद',
      title: t.sirhindAlertTitle,
      desc: t.sirhindAlertDesc,
      severity: 'Med',
      severityColor: '#F59E0B',
      status: t.mandalReview,
      time: '10:45 AM',
    },
    {
      id: 3,
      village: 'Lakhanpur',
      villageHi: 'लखनपुर',
      title: t.lakhanpurAlertTitle,
      desc: t.lakhanpurAlertDesc,
      severity: 'Low',
      severityColor: '#94A3B8',
      status: t.pingSent,
      time: '10:45 AM',
    }
  ];

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleAction = (actionType, operatorName) => {
    if (actionType === 'ping') {
      showToast(lang === 'en' ? `Ping successfully sent to operator ${operatorName}.` : `ऑपरेटर ${operatorName} को पिंग सफलतापूर्वक भेजा गया।`);
    } else if (actionType === 'dispatch') {
      showToast(lang === 'en' ? `Repair crew dispatch request sent for ${selectedVillage.name}.` : `${selectedVillage.nameHi} के लिए मरम्मत दल प्रेषण अनुरोध भेजा गया।`);
    }
  };

  // Filter & Search Logic
  const filteredVillages = villages.filter(v => {
    const nameMatch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      v.nameHi.includes(searchQuery);
    
    if (statusFilter === 'all') return nameMatch;
    return nameMatch && v.status.toLowerCase() === statusFilter;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif", position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', left: 0, top: '15%', width: 150, height: 400, borderTopRightRadius: 9999, borderBottomRightRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: 0, top: '35%', width: 150, height: 400, borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />

      <CommonNavbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: 24,
          right: 24,
          backgroundColor: '#1E2530',
          color: '#FFFFFF',
          padding: '16px 28px',
          borderRadius: 12,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          zIndex: 10000,
          fontSize: 16,
          fontWeight: 600,
          border: '1px solid #334155',
          fontFamily: "'Inter', sans-serif",
          animation: 'fadeIn 0.3s ease-out forwards'
        }}>
          {toastMessage}
        </div>
      )}

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 32, position: 'relative', zIndex: 10 }}>
        
        {/* ===== DISTRICT DASHBOARD HEADER ===== */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 44, fontWeight: 500, color: '#0F172A', margin: 0, lineHeight: 1.1 }}>
                {lang === 'en' ? 'District Dashboard — Mewat District' : 'जिला निगरानी — मेवात जिला'}
              </h1>
              <span style={{
                backgroundColor: '#EFECE6',
                color: '#5A6270',
                border: '1px solid #E2DDD5',
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                {t.villagesMonitoredPill}
              </span>
            </div>
            <p style={{ fontSize: 16, color: '#64748B', margin: '8px 0 0 0' }}>
              {t.lastRefreshed}
            </p>
          </div>
        </div>

        {/* ===== TOP STATS ROW ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          
          {/* Villages Monitored */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HomeIcon style={{ width: 24, height: 24, color: '#3B82F6' }} />
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
                {t.statVillagesMonitored}
              </span>
              <strong style={{ fontSize: 28, fontWeight: 700, color: '#0F172A', marginTop: 4, display: 'block' }}>12</strong>
            </div>
          </div>

          {/* Active Issues */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangleIcon style={{ width: 24, height: 24, color: '#EF4444' }} />
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
                {t.statActiveIssues}
              </span>
              <strong style={{ fontSize: 28, fontWeight: 700, color: '#EF4444', marginTop: 4, display: 'block' }}>3</strong>
            </div>
          </div>

          {/* Unacknowledged Alerts */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BellIcon style={{ width: 24, height: 24, color: '#D97706' }} />
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
                {t.statUnacknowledged}
              </span>
              <strong style={{ fontSize: 28, fontWeight: 700, color: '#D97706', marginTop: 4, display: 'block' }}>7</strong>
            </div>
          </div>

          {/* Stale Data */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 24, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClockIcon style={{ width: 24, height: 24, color: '#64748B' }} />
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
                {t.statStaleData}
              </span>
              <strong style={{ fontSize: 28, fontWeight: 700, color: t.statStaleDataVal === 'ON' || t.statStaleDataVal === 'चालू' ? '#10B981' : '#EF4444', marginTop: 4, display: 'block' }}>{t.statStaleDataVal}</strong>
            </div>
          </div>
          
        </div>

        {/* ===== FILTERS & SEARCH TOOLBAR ===== */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 16, padding: '16px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <SearchIcon style={{ width: 18, height: 18, color: '#94A3B8' }} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                width: '100%',
                height: 44,
                paddingLeft: 42,
                paddingRight: 16,
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                fontSize: 14,
                color: '#1E2530',
                outline: 'none',
                backgroundColor: '#FAF9F6',
                fontFamily: "'Inter', sans-serif"
              }}
            />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: t.filterAll },
              { id: 'safe', label: t.filterSafe },
              { id: 'warning', label: t.filterWarning },
              { id: 'critical', label: t.filterCritical }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  height: 38,
                  padding: '0 18px',
                  borderRadius: 8,
                  border: statusFilter === tab.id ? 'none' : '1px solid #E2E8F0',
                  backgroundColor: statusFilter === tab.id ? '#0F172A' : '#FFFFFF',
                  color: statusFilter === tab.id ? '#FFFFFF' : '#64748B',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== VILLAGE SUMMARIES SECTION ===== */}
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 600, color: '#0F172A', marginBottom: 20, borderBottom: '2px solid #E5E7EB', paddingBottom: 12 }}>
            {t.villageSummaries}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {filteredVillages.map(v => (
              <div
                key={v.id}
                onClick={() => setSelectedVillage(v)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid #E5E7EB',
                  borderTop: `6px solid ${v.statusColor}`,
                  padding: '24px 28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 230,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,23,42,0.04)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
                }}
              >
                {/* Card Top */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      {lang === 'en' ? v.name : v.nameHi}
                    </h3>
                    {/* Status Pill */}
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      backgroundColor: v.status === 'Safe' ? '#ECFDF5' : v.status === 'Warning' ? '#FFFBEB' : '#FEF2F2',
                      border: `1px solid ${v.statusColor}`,
                      color: v.statusColor,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      {v.status === 'Safe' ? (
                        <>
                          <svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {t.safe}
                        </>
                      ) : (
                        <>
                          <svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {v.status === 'Warning' ? t.warning : t.critical}
                        </>
                      )}
                    </span>
                  </div>

                  <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
                    {t.sync}: {v.syncTime}
                  </p>

                  {/* Alert Message Box */}
                  {v.alertMsg && (
                    <div style={{
                      marginTop: 16,
                      padding: '10px 14px',
                      borderRadius: 8,
                      backgroundColor: v.status === 'Warning' ? '#FFFBEB' : '#FEF2F2',
                      border: `1px solid ${v.status === 'Warning' ? '#FDE68A' : '#FCA5A5'}`,
                      color: v.status === 'Warning' ? '#B45309' : '#B91C1C',
                      fontSize: 13,
                      fontWeight: 600
                    }}>
                      {v.alertMsg}
                    </div>
                  )}
                </div>

                {/* Card Bottom */}
                <div>
                  <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '18px 0 12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
                        {t.jalBandhu}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#475569', marginTop: 2, display: 'block' }}>
                        {lang === 'en' ? v.operator : v.operatorHi}
                      </span>
                    </div>

                    {/* Alert Badge count */}
                    {v.alerts > 0 ? (
                      <span style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        backgroundColor: '#EF4444',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {v.alerts}
                      </span>
                    ) : (
                      <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>
                        {t.noAlerts}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM DETAILS GRID ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 24, marginTop: 12 }}>
          
          {/* District Alerts Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 32, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {t.districtAlerts}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}>
                {t.viewAll}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexGrow: 1 }}>
              {districtAlertsList.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    backgroundColor: '#FAF9F6',
                    border: '1px solid #E5E7EB',
                    borderLeft: `4px solid ${alert.severityColor}`,
                    borderRadius: 12,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1E2530', margin: 0 }}>
                      {alert.title}
                    </h4>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
                      {alert.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, borderTop: '1px solid #E2DDD5', paddingTop: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: 4,
                        color: '#FFFFFF',
                        backgroundColor: alert.severityColor
                      }}>
                        {alert.severity}
                      </span>
                      <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>
                        {alert.status}
                      </span>
                    </div>

                    <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                      {t.autoEscalated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Average Pressure Bar Chart Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 32, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
            
            {/* Chart Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {t.averagePressure}
              </h3>
              
              {/* Legend */}
              <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#064E3B' }}></span>
                  {t.safe}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#854D0E' }}></span>
                  {t.warning}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#991B1B' }}></span>
                  {t.critical}
                </span>
              </div>
            </div>

            {/* Custom CSS Bar Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Plot area */}
              <div style={{
                height: 250,
                borderBottom: '2px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '24px 8px 0 8px',
                position: 'relative'
              }}>
                {/* Horizontal reference grid lines */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: '28.5%', borderBottom: '1px dashed #E2E8F0', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: '57%', borderBottom: '1px dashed #E2E8F0', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: '85.5%', borderBottom: '1px dashed #E2E8F0', pointerEvents: 'none' }} />

                {villages.map(v => {
                  const maxVal = 0.35; // Maximum MPa scale
                  const percent = Math.min((v.pressure / maxVal) * 100, 100);
                  const barBgColor = v.status === 'Safe' ? '#064E3B' : v.status === 'Warning' ? '#854D0E' : '#991B1B';

                  return (
                    <div
                      key={v.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '100%',
                        flexGrow: 1,
                        maxWidth: 60,
                        zIndex: 5
                      }}
                    >
                      {/* Pressure Label above bar */}
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>
                        {v.pressure} MPa
                      </span>

                      {/* Bar fill */}
                      <div style={{
                        width: 40,
                        height: `${percent}%`,
                        backgroundColor: barBgColor,
                        borderRadius: '6px 6px 0 0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        transition: 'height 0.5s ease-out'
                      }} />
                    </div>
                  );
                })}
              </div>

              {/* Village Labels Row */}
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 8px 0 8px' }}>
                {villages.map(v => (
                  <div key={v.id} style={{ width: 60, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lang === 'en' ? v.name : v.nameHi}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ===== VILLAGE DETAILS OPERATIONAL POPUP MODAL ===== */}
      {selectedVillage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            border: '1px solid #E2E8F0',
            padding: 40,
            width: '90%',
            maxWidth: 640,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                  {lang === 'en' ? selectedVillage.name : selectedVillage.nameHi} — {t.modalTitle}
                </h3>
                <span style={{ fontSize: 13, color: '#64748B', display: 'block', marginTop: 4 }}>
                  {t.sync}: {selectedVillage.syncTime}
                </span>
              </div>
              
              {/* Status Badge */}
              <span style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                backgroundColor: selectedVillage.status === 'Safe' ? '#ECFDF5' : selectedVillage.status === 'Warning' ? '#FFFBEB' : '#FEF2F2',
                border: `1px solid ${selectedVillage.statusColor}`,
                color: selectedVillage.statusColor,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}>
                {selectedVillage.status === 'Safe' ? (
                  <>
                    <svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t.safe}
                  </>
                ) : (
                  <>
                    <svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {selectedVillage.status === 'Warning' ? t.warning : t.critical}
                  </>
                )}
              </span>
            </div>

            {/* Alert Banner / Safe Msg */}
            {selectedVillage.alertMsg ? (
              <div style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: selectedVillage.status === 'Warning' ? '#FFFBEB' : '#FEF2F2',
                border: `1px solid ${selectedVillage.status === 'Warning' ? '#FDE68A' : '#FCA5A5'}`,
                color: selectedVillage.status === 'Warning' ? '#B45309' : '#B91C1C',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}>
                <strong style={{ fontSize: 15, fontWeight: 700 }}>{t.modalAlertsActive}</strong>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{selectedVillage.alertMsgFull}</span>
              </div>
            ) : (
              <div style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                fontSize: 14,
                fontWeight: 500
              }}>
                {t.modalSafeMsg}
              </div>
            )}

            {/* Sensor readings gauges */}
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ActivityIcon style={{ width: 18, height: 18, color: '#64748B' }} />
                {t.sensorReadings}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Pressure Gauge */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    <span>{t.pressure}</span>
                    <strong>{selectedVillage.pressure} MPa <span style={{ color: '#94A3B8', fontWeight: 500 }}>(nominal 0.05-0.35)</span></strong>
                  </div>
                  <div style={{ height: 10, width: '100%', backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((selectedVillage.pressure / 0.35) * 100, 100)}%`,
                      backgroundColor: selectedVillage.pressure < 0.05 ? '#EF4444' : selectedVillage.pressure > 0.32 ? '#D97706' : '#10B981',
                      borderRadius: 5
                    }} />
                  </div>
                </div>

                {/* Flow Rate */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    <span>{t.flowRate}</span>
                    <strong>{selectedVillage.flow} L/min <span style={{ color: '#94A3B8', fontWeight: 500 }}>(nominal 5-35)</span></strong>
                  </div>
                  <div style={{ height: 10, width: '100%', backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((selectedVillage.flow / 35) * 100, 100)}%`,
                      backgroundColor: selectedVillage.flow === 0 ? '#EF4444' : selectedVillage.flow < 5 ? '#D97706' : '#10B981',
                      borderRadius: 5
                    }} />
                  </div>
                </div>

                {/* TDS (Water Quality) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    <span>{t.waterQuality}</span>
                    <strong>{selectedVillage.tds} ppm <span style={{ color: '#94A3B8', fontWeight: 500 }}>(nominal &lt; 500)</span></strong>
                  </div>
                  <div style={{ height: 10, width: '100%', backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((selectedVillage.tds / 2500) * 100, 100)}%`,
                      backgroundColor: selectedVillage.tds > 2000 ? '#EF4444' : selectedVillage.tds > 1000 ? '#D97706' : '#10B981',
                      borderRadius: 5
                    }} />
                  </div>
                </div>

                {/* Battery status */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    <span>{t.batteryStatus}</span>
                    <strong>{selectedVillage.battery}%</strong>
                  </div>
                  <div style={{ height: 10, width: '100%', backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${selectedVillage.battery}%`,
                      backgroundColor: selectedVillage.battery < 20 ? '#EF4444' : selectedVillage.battery < 40 ? '#D97706' : '#10B981',
                      borderRadius: 5
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Operator Card Section */}
            <div style={{
              backgroundColor: '#FAF9F6',
              border: '1px solid #E5E7EB',
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#EFECE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserIcon style={{ width: 20, height: 20, color: '#64748B' }} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
                  {t.operatorRole}
                </span>
                <strong style={{ fontSize: 15, fontWeight: 700, color: '#1E2530' }}>
                  {lang === 'en' ? selectedVillage.operator : selectedVillage.operatorHi}
                </strong>
                <span style={{ fontSize: 13, color: '#64748B', display: 'block', marginTop: 2 }}>
                  {t.phone}: {selectedVillage.phone}
                </span>
              </div>
              <a href={`tel:${selectedVillage.phone}`} style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2DDD5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B'
              }}>
                <PhoneIcon style={{ width: 16, height: 16 }} />
              </a>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-end', borderTop: '1px solid #F1F5F9', paddingTop: 20 }}>
              <button
                onClick={() => handleAction('ping', lang === 'en' ? selectedVillage.operator : selectedVillage.operatorHi)}
                style={{
                  height: 44,
                  padding: '0 20px',
                  borderRadius: 8,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <BellIcon style={{ width: 16, height: 16 }} />
                {t.actionPing}
              </button>

              <button
                onClick={() => handleAction('dispatch')}
                style={{
                  height: 44,
                  padding: '0 20px',
                  borderRadius: 8,
                  backgroundColor: '#0F172A',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <ActivityIcon style={{ width: 16, height: 16 }} />
                {t.actionDispatch}
              </button>

              <button
                onClick={() => setSelectedVillage(null)}
                style={{
                  height: 44,
                  padding: '0 20px',
                  borderRadius: 8,
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  color: '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {t.closeDetails}
              </button>
            </div>

          </div>
        </div>
      )}

      <CommonFooter />
    </div>
  );
}
