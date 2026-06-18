import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { villages } from "../data/mockData";
import CommonNavbar from "../components/CommonNavbar";
import CommonFooter from "../components/CommonFooter";
import ReportIssueModal from "../components/ReportIssueModal";

function VillagerView() {
  const [selectedVillage, setSelectedVillage] = useState("rampur");
  const [waterSafe, setWaterSafe] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useAuth();

  const selectedVillageObj = villages.find(v => v.id === selectedVillage) || villages[0];

  useEffect(() => {
    setWaterSafe(selectedVillageObj.status !== 'critical');
  }, [selectedVillage, selectedVillageObj.status]);

  const textDict = {
    en: {
      waterSafeTitle: "Water is Safe to Drink",
      waterSafeDesc: "Last checked: Today, 10:30 AM. Safe for all household and cooking uses.",
      waterUnsafeTitle: "Water is Unsafe",
      waterUnsafeDesc: "Contamination alert. Please boil water thoroughly before use.",
      receivedToday: "Today's Water Supply",
      reportButton: "Report a Problem",
      needHelpTitle: "Need Help?",
      needHelpDesc: "If you notice water leaks, low pressure, or quality issues in your area, please report it or contact our helpline.",
      helplineLabel: "TOLL-FREE HELPLINE",
      latestUpdatesTitle: "Latest Updates Today",
    },
    hi: {
      waterSafeTitle: "पीने का पानी सुरक्षित है",
      waterSafeDesc: "आखिरी जांच: आज, सुबह 10:30। घरेलू और खाना पकाने के उपयोग के लिए सुरक्षित।",
      waterUnsafeTitle: "पानी असुरक्षित है",
      waterUnsafeDesc: "संदूषण चेतावनी। उपयोग से पहले पानी को अच्छी तरह उबालें।",
      receivedToday: "आज की पानी आपूर्ति",
      reportButton: "समस्या दर्ज करें",
      needHelpTitle: "सहायता चाहिए?",
      needHelpDesc: "यदि आप अपने क्षेत्र में पानी के रिसाव, कम दबाव या गुणवत्ता की समस्याओं को देखते हैं, तो कृपया इसकी रिपोर्ट करें या हमारी हेल्पलाइन पर संपर्क करें.",
      helplineLabel: "टोल-फ्री हेल्पलाइन",
      latestUpdatesTitle: "आज के नवीनतम अपडेट",
    }
  };

  const t = textDict[lang] || textDict['en'];

  // Helper to translate village names & locations
  const getVillageNameOnly = (village) => {
    const parts = village.name.split(' / ');
    return lang === 'hi' ? parts[0] : parts[1];
  };

  const getLocalizedIssue = (village) => {
    if (!village.issueNote) return "";
    const issues = {
      'Pressure low at P3': {
        en: 'Pressure low at P3 zone. Flow rate might be affected.',
        hi: 'P3 जोन में दबाव कम है। प्रवाह दर प्रभावित हो सकती है।'
      },
      'Water unsafe — contamination detected': {
        en: 'Water unsafe — contamination detected in local supply.',
        hi: 'पानी असुरक्षित है — स्थानीय आपूर्ति में संदूषण पाया गया है।'
      },
      'Stale data >1hr': {
        en: 'Stale sensor data (>1 hour). System status might not reflect real-time conditions.',
        hi: 'पुराना सेंसर डेटा (>1 घंटा)। हो सकता है कि सिस्टम स्थिति वास्तविक समय की स्थिति को न दर्शाए।'
      },
      'Pipe leakage detected near P2 zone. Repairs are underway.': {
        en: 'Pipe leakage detected near P2 zone. Repairs are underway.',
        hi: 'पी2 जोन के पास पाइप रिसाव का पता चला है। मरम्मत का काम जारी है।'
      }
    };
    const issue = issues[village.issueNote];
    if (issue) {
      return lang === 'hi' ? issue.hi : issue.en;
    }
    return village.issueNote;
  };

  const getFlowStatus = () => {
    if (selectedVillage === 'fatehpur') {
      return {
        title: lang === 'hi' ? 'आपूर्ति निलंबित' : 'Supply Suspended',
        desc: lang === 'hi' ? 'सुरक्षा चिंताओं के कारण प्रवाह रोक दिया गया है' : 'Flow stopped due to safety concerns',
        flowing: false
      };
    }
    if (selectedVillage === 'lakhanpur') {
      return {
        title: lang === 'hi' ? 'प्रवाह स्थिति अनिश्चित' : 'Flow Status Uncertain',
        desc: lang === 'hi' ? 'सेंसर डिस्कनेक्ट — पिछले 1 घंटे से कोई डेटा नहीं' : 'Sensor offline — no data for last 1 hour',
        flowing: false
      };
    }
    if (selectedVillage === 'sirhind') {
      return {
        title: lang === 'hi' ? 'कम दबाव प्रवाह' : 'Low Pressure Flow',
        desc: lang === 'hi' ? 'आपूर्ति सक्रिय है लेकिन दबाव कम है' : 'Supply active but pressure is low',
        flowing: true
      };
    }
    return {
      title: lang === 'hi' ? 'पानी आ रहा है' : 'Water is Flowing',
      desc: lang === 'hi' ? 'आपूर्ति सुबह 06:00 बजे से सक्रिय' : 'Supply active since 06:00 AM',
      flowing: true
    };
  };

  const getSupplyData = () => {
    const supplies = {
      rampur: { val: '450', pct: '45%', status: lang === 'hi' ? 'सामान्य से कम' : 'Lower than usual' },
      sirhind: { val: '300', pct: '30%', status: lang === 'hi' ? 'कम आपूर्ति' : 'Low supply' },
      fatehpur: { val: '0', pct: '0%', status: lang === 'hi' ? 'निलंबित' : 'Suspended' },
      govindpur: { val: '650', pct: '75%', status: lang === 'hi' ? 'सामान्य' : 'Normal' },
      lakhanpur: { val: '380', pct: '38%', status: lang === 'hi' ? 'सामान्य से कम' : 'Lower than usual' },
      chandpur: { val: '550', pct: '65%', status: lang === 'hi' ? 'सामान्य' : 'Normal' },
    };
    return supplies[selectedVillage] || supplies.rampur;
  };

  const getUpdates = () => {
    const updatesList = {
      rampur: [
        { time: '10:30 AM', text: lang === 'hi' ? 'पानी की गुणवत्ता की जांच की गई और सुरक्षित पाई गई' : 'Water quality checked and verified safe', color: '#16A34A' },
        { time: '06:00 AM', text: lang === 'hi' ? 'गांव के लिए जलापूर्ति शुरू की गई' : 'Water supply started for the village', color: '#16A34A' },
        { time: lang === 'en' ? 'Yesterday' : 'कल', text: lang === 'hi' ? 'पी2 पाइपलाइन रिसाव के लिए मरम्मत टीम भेजी गई' : 'Repair team dispatched for P2 pipeline leakage', color: '#F59E0B' }
      ],
      sirhind: [
        { time: '10:30 AM', text: lang === 'hi' ? 'अंतिम छोर नोड P3 पर कम दबाव का संकेत मिला' : 'Low pressure alert detected at tail-end node P3', color: '#F59E0B' },
        { time: '06:00 AM', text: lang === 'hi' ? 'जलापूर्ति शुरू की गई (दबाव 0.08 MPa)' : 'Water supply started (pressure at 0.08 MPa)', color: '#16A34A' },
        { time: lang === 'en' ? 'Yesterday' : 'कल', text: lang === 'hi' ? 'सेंसर अंशांकन के लिए रखरखाव अनुरोध दर्ज किया गया' : 'Maintenance request logged for sensor calibration', color: '#64748B' }
      ],
      fatehpur: [
        { time: '10:30 AM', text: lang === 'hi' ? 'पानी असुरक्षित होने की चेतावनी जारी की गई' : 'Water quality unsafe warning issued', color: '#DC2626' },
        { time: '09:00 AM', text: lang === 'hi' ? 'प्रदूषण चेतावनी जिला स्तर पर भेजी गई' : 'Contamination alert auto-escalated to District', color: '#DC2626' },
        { time: lang === 'en' ? 'Yesterday' : 'कल', text: lang === 'hi' ? 'सफाई के लिए आपूर्ति लाइन को अस्थायी रूप से बाईपास किया गया' : 'Supply line temporarily bypassed for cleaning', color: '#64748B' }
      ],
      govindpur: [
        { time: '10:30 AM', text: lang === 'hi' ? 'पानी की गुणवत्ता की जांच की गई और उत्कृष्ट पाई गई (pH 7.2)' : 'Water quality checked and verified optimal (pH 7.2)', color: '#16A34A' },
        { time: '06:00 AM', text: lang === 'hi' ? 'निर्धारित समय पर जलापूर्ति शुरू की गई' : 'Water supply started on schedule', color: '#16A34A' },
        { time: lang === 'en' ? 'Yesterday' : 'कल', text: lang === 'hi' ? 'नियमित सेंसर नैदानिक जांच पूरी हुई' : 'Routine sensor diagnostic check completed', color: '#16A34A' }
      ],
      lakhanpur: [
        { time: '10:30 AM', text: lang === 'hi' ? 'चेतावनी: गेटवे से कोई डेटा प्राप्त नहीं हुआ' : 'Alert: No telemetry data received from gateway', color: '#F59E0B' },
        { time: '06:00 AM', text: lang === 'hi' ? 'जलापूर्ति शुरू (प्रवाह अनियंत्रित)' : 'Water supply started (flow unmonitored)', color: '#64748B' },
        { time: lang === 'en' ? 'Yesterday' : 'कल', text: lang === 'hi' ? 'मुख्य नोड पर कम बैटरी चेतावनी दर्ज की गई' : 'Battery warning logged at main node', color: '#F59E0B' }
      ],
      chandpur: [
        { time: '10:30 AM', text: lang === 'hi' ? 'पानी की गुणवत्ता की जांच की गई और सुरक्षित पाई गई' : 'Water quality checked and verified safe', color: '#16A34A' },
        { time: '06:00 AM', text: lang === 'hi' ? 'निर्धारित समय पर जलापूर्ति शुरू की गई' : 'Water supply started on schedule', color: '#16A34A' },
        { time: lang === 'en' ? 'Yesterday' : 'कल', text: lang === 'hi' ? 'वाल्व दबाव का सफलतापूर्वक अंशांकन किया गया' : 'Valve pressure calibrated successfully', color: '#16A34A' }
      ]
    };
    return updatesList[selectedVillage] || updatesList.rampur;
  };

  const flowStatus = getFlowStatus();
  const supplyData = getSupplyData();
  const updates = getUpdates();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif" }}>
      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', padding: '32px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Page Header with Dropdown */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 500, color: '#0F172A', marginBottom: 8, lineHeight: 1.1 }}>
              {getVillageNameOnly(selectedVillageObj) + (lang === 'en' ? ' Village' : ' गांव')}
            </h1>
            <p style={{ fontSize: 20, fontWeight: 500, color: '#64748B', margin: 0 }}>
              {lang === 'en' ? `${getVillageNameOnly(selectedVillageObj)} Village Portal` : `${getVillageNameOnly(selectedVillageObj)} ग्राम पोर्टल`}
            </p>
          </div>

          {/* Village Selector Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label htmlFor="village-select" style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>
              {lang === 'en' ? 'Select Village' : 'गांव चुनें'}
            </label>
            <select
              id="village-select"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              style={{
                padding: '12px 18px',
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontSize: 16,
                fontWeight: 600,
                outline: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                minWidth: 220,
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            >
              {villages.map((v) => (
                <option key={v.id} value={v.id}>
                  {lang === 'hi' ? v.name.split(' / ')[0] : v.name.split(' / ')[1]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Status Cards Row: 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Water Safety (Interactive Toggle) */}
          <button
            onClick={() => setWaterSafe((prev) => !prev)}
            style={{
              backgroundColor: waterSafe ? '#FFFFFF' : '#FEF2F2',
              border: waterSafe ? '1px solid #E5E7EB' : '1px solid #DC2626',
              borderRadius: 20,
              padding: 32,
              minHeight: 180,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 30px rgba(15,23,42,0.01)',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: waterSafe ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontSize: 22, fontWeight: 'bold', color: waterSafe ? '#16A34A' : '#DC2626' }}>
                  {waterSafe ? "✓" : "!"}
                </span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: waterSafe ? '#16A34A' : '#DC2626' }}>
                {waterSafe ? t.waterSafeTitle : t.waterUnsafeTitle}
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#64748B', margin: '16px 0 0 0', lineHeight: '20px', fontWeight: 500 }}>
              {waterSafe ? t.waterSafeDesc : t.waterUnsafeDesc}
            </p>
          </button>

          {/* Card 2: Water Flow Status */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 20,
            padding: 32,
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 30px rgba(15,23,42,0.01)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: flowStatus.flowing ? 'rgba(59, 130, 246, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: 22, height: 22, color: flowStatus.flowing ? '#3B82F6' : '#64748B' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>
                {flowStatus.title}
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#64748B', margin: '16px 0 0 0', lineHeight: '20px', fontWeight: 500 }}>
              {flowStatus.desc}
            </p>
          </div>

          {/* Card 3: Today's Water Supply */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 20,
            padding: 32,
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 30px rgba(15,23,42,0.01)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                  {t.receivedToday}
                </span>
                {supplyData.val !== '0' && (
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: supplyData.status === 'Normal' || supplyData.status === 'सामान्य' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(220, 38, 38, 0.08)',
                    color: supplyData.status === 'Normal' || supplyData.status === 'सामान्य' ? '#16A34A' : '#DC2626',
                    padding: '4px 10px',
                    borderRadius: 20
                  }}>
                    {supplyData.status}
                  </span>
                )}
              </div>
              <div style={{ height: 8, overflow: 'hidden', borderRadius: 999, backgroundColor: '#E5E7EB', marginTop: 8 }}>
                <div style={{ 
                  height: '100%', 
                  width: supplyData.pct, 
                  backgroundColor: supplyData.status === 'Normal' || supplyData.status === 'सामान्य' ? '#16A34A' : '#F59E0B', 
                  borderRadius: 999 
                }} />
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#64748B', margin: '12px 0 0 0', fontWeight: 600 }}>
              {supplyData.val === '0' 
                ? (lang === 'hi' ? 'आपूर्ति उपलब्ध नहीं' : 'No supply available') 
                : `${supplyData.val} ${lang === 'hi' ? 'लीटर आपूर्ति की गई' : 'Litres Supplied'}`
              }
            </p>
          </div>
        </div>

        {/* Dynamic Alert Banner: Yellow/Red if warnings exist, Green if system is safe */}
        {selectedVillageObj.status !== 'safe' ? (
          <div style={{
            backgroundColor: selectedVillageObj.status === 'critical' ? '#FEF2F2' : '#FFFBEB',
            border: selectedVillageObj.status === 'critical' ? '1px solid rgba(220, 38, 38, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
            borderLeft: selectedVillageObj.status === 'critical' ? '6px solid #DC2626' : '6px solid #F59E0B',
            borderRadius: 16,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <svg style={{ width: 36, height: 36, color: selectedVillageObj.status === 'critical' ? '#DC2626' : '#F59E0B', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: selectedVillageObj.status === 'critical' ? '#991B1B' : '#B45309', margin: '0 0 4px 0' }}>
                {selectedVillageObj.status === 'critical' 
                  ? (lang === 'hi' ? 'गंभीर चेतावनी' : 'Critical Warning')
                  : (lang === 'hi' ? 'सिस्टम चेतावनी' : 'System Warning')
                }
              </h4>
              <p style={{ fontSize: 16, color: selectedVillageObj.status === 'critical' ? '#7F1D1D' : '#78350F', margin: 0, fontWeight: 500 }}>
                {getLocalizedIssue(selectedVillageObj)}
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid rgba(22, 163, 74, 0.2)',
            borderLeft: '6px solid #16A34A',
            borderRadius: 16,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <svg style={{ width: 36, height: 36, color: '#16A34A', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: '#166534', margin: '0 0 4px 0' }}>
                {lang === 'hi' ? 'सिस्टम सामान्य है' : 'System Status Normal'}
              </h4>
              <p style={{ fontSize: 16, color: '#14532D', margin: 0, fontWeight: 500 }}>
                {lang === 'hi' 
                  ? 'सभी सेंसर और जलापूर्ति प्रणालियां सुचारू रूप से कार्य कर रही हैं।' 
                  : 'All sensors and water supply lines are operating normally.'
                }
              </p>
            </div>
          </div>
        )}

        {/* Bottom Split Row: Latest Updates & Need Help */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]" style={{ gap: 24 }}>
          {/* Latest Updates Timeline */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 32, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
              {t.latestUpdatesTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {updates.map((update, index) => (
                <div key={index} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: update.color, zIndex: 10, marginTop: 6 }} />
                    {index < updates.length - 1 && (
                      <div style={{ width: 2, flexGrow: 1, backgroundColor: '#E2E8F0', marginTop: 4, marginBottom: -24 }} />
                    )}
                  </div>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>{update.time}</span>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>{update.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help Citizen Section */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 16, marginTop: 0 }}>
                {t.needHelpTitle}
              </h3>
              <p style={{ fontSize: 15, color: '#64748B', lineHeight: '22px', margin: '0 0 24px 0', fontWeight: 500 }}>
                {t.needHelpDesc}
              </p>
              
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 20, marginBottom: 24 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>
                  {t.helplineLabel}
                </span>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', display: 'block', marginTop: 6 }}>
                  1800-180-1551
                </span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                borderRadius: 12,
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                height: 52,
                fontSize: 16,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
            >
              <svg style={{ width: 18, height: 18, fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {t.reportButton}
            </button>
          </div>
        </div>
      </main>

      <CommonFooter />

      <ReportIssueModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default VillagerView;
