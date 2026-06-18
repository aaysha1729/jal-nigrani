import { useState } from 'react';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';
import { useAuth } from '../context/AuthContext';
import { initialSettings } from '../data/mockData';

// Bilingual translations dictionary
const TRANSLATIONS = {
  en: {
    settingsTitle: "Settings",
    settingsSub: "Configure system parameters and user preferences",
    profileTitle: "Profile",
    nameLabel: "Name",
    roleLabel: "Role",
    assignedAreaLabel: "Assigned Area",
    notificationsTitle: "Notifications",
    smsAlerts: "SMS Alerts",
    smsAlertsDesc: "Critical sensor failures and pressure alerts sent directly to registered mobile.",
    waAlerts: "WhatsApp Alerts",
    waAlertsDesc: "Receive weekly summary reports and community updates on WhatsApp.",
    systemStandardsTitle: "System Standards",
    adminControlled: "Administrator Controlled",
    minPressure: "Minimum Pressure",
    maxPressure: "Maximum Pressure",
    minFlow: "Minimum Flow Rate",
    batteryWarning: "Battery Warning Level",
    refreshRate: "Data Refresh Rate",
    helperText: "Monitoring thresholds are configured by the Water Department and cannot be modified by village operators.",
    systemPrefsTitle: "System Preferences",
    langLabel: "System Language",
    saveSuccessMsg: "Settings saved successfully!",
    saveBtn: "Save Preferences",
    resetBtn: "Reset"
  },
  hi: {
    settingsTitle: "सेटिंग्स",
    settingsSub: "सिस्टम मापदंडों और उपयोगकर्ता प्राथमिकताओं को कॉन्फ़िगर करें",
    profileTitle: "उपयोगकर्ता प्रोफ़ाइल",
    nameLabel: "नाम",
    roleLabel: "भूमिका",
    assignedAreaLabel: "assigned_area",
    assignedAreaVal: "रामपुर / Rampur",
    notificationsTitle: "सूचनाएं",
    smsAlerts: "एसएमएस अलर्ट",
    smsAlertsDesc: "महत्वपूर्ण सेंसर विफलताओं और दबाव अलर्ट को सीधे पंजीकृत मोबाइल पर भेजा जाता है।",
    waAlerts: "व्हाट्सएप अलर्ट",
    waAlertsDesc: "व्हाट्सएप पर साप्ताहिक सारांश रिपोर्ट और समुदाय अपडेट प्राप्त करें।",
    systemStandardsTitle: "सिस्टम मानक",
    adminControlled: "प्रशासक नियंत्रित",
    minPressure: "न्यूनतम दबाव",
    maxPressure: "अधिकतम दबाव",
    minFlow: "न्यूनतम प्रवाह दर",
    batteryWarning: "बैटरी चेतावनी स्तर",
    refreshRate: "डेटा ताज़ा अंतराल",
    helperText: "निगरानी सीमा स्तर जल विभाग द्वारा कॉन्फ़िगर किए गए हैं और ग्राम ऑपरेटरों द्वारा संशोधित नहीं किए जा सकते हैं।",
    systemPrefsTitle: "सिस्टम प्राथमिकताएं",
    langLabel: "भाषा",
    saveSuccessMsg: "सेटिंग्स सफलतापूर्वक सहेजी गईं!",
    saveBtn: "प्राथमिकताएं सहेजें",
    resetBtn: "रीसेट"
  }
};

const SettingsPage = () => {
  const { user, lang, setLang } = useAuth();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Track editable values
  const [settings, setSettings] = useState({
    notificationSms: initialSettings.notificationSms,
    notificationWhatsApp: initialSettings.notificationWhatsApp,
    language: lang,
    refreshInterval: initialSettings.refreshInterval || 15,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLang(settings.language);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleReset = () => {
    setSettings({
      notificationSms: initialSettings.notificationSms,
      notificationWhatsApp: initialSettings.notificationWhatsApp,
      language: lang,
      refreshInterval: initialSettings.refreshInterval || 15,
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif" }}>
      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', padding: '32px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Page Header */}
        <div style={{ marginBottom: 12 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64, fontWeight: 500, color: '#0F172A', marginBottom: 12, lineHeight: 1.1 }}>
            {t.settingsTitle}
          </h1>
          <p style={{ fontSize: 22, fontWeight: 400, color: '#64748B', margin: 0 }}>
            {t.settingsSub}
          </p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Breadcrumbs */}
          <nav style={{ fontSize: 14, fontWeight: 500, color: '#64748B', marginBottom: 16 }}>
            <span>Home</span>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Settings</span>
          </nav>

          {/* Success Notification Banner */}
          {saveSuccess && (
            <div style={{ backgroundColor: '#16A34A1A', border: '1px solid #16A34A4D', color: '#16A34A', padding: 18, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 16, fontWeight: 600 }} className="fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>✓</span>
                <span>{t.saveSuccessMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* GRID 1: PROFILE & NOTIFICATIONS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, alignItems: 'start' }}>
              
              {/* Profile Card */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 340, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
                <div>
                  <h3 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
                    {t.profileTitle}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#64748B', margin: '0 0 6px 0' }}>{t.nameLabel}</p>
                      <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: 0 }}>{user?.name || 'सुनीता देवी / Sunita Devi'}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#64748B', margin: '0 0 6px 0' }}>{t.roleLabel}</p>
                      <span style={{ display: 'inline-block', fontSize: 14, backgroundColor: '#FAF9F6', color: '#0F172A', fontWeight: 600, padding: '6px 12px', borderRadius: 999, border: '1px solid #E5E7EB' }}>
                        {user?.role === 'jal_bahini' ? 'Jal Bahini (Operator)' : 'District Officer'}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#64748B', margin: '0 0 6px 0' }}>{lang === 'hi' ? 'कार्यक्षेत्र / Assigned Area' : 'Assigned Area'}</p>
                      <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: 0 }}>{user?.village || user?.district || 'रामपुर / Rampur'}</p>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 14, color: '#64748B', fontWeight: 500, fontStyle: 'italic', borderTop: '1px solid #E5E7EB', paddingTop: 18, marginTop: 18 }}>
                  ID: {user?.username || 'jalbahini1'}
                </div>
              </div>

              {/* Notification Settings (Editable) */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 28, minHeight: 340, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
                <h3 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
                  {t.notificationsTitle}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* SMS Toggle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FAF9F6', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                    <div style={{ paddingRight: 16 }}>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: 0 }}>{t.smsAlerts}</h4>
                      <p style={{ fontSize: 15, color: '#64748B', marginTop: 6, margin: 0, lineHeight: '22px' }}>{t.smsAlertsDesc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer" style={{ flexShrink: 0 }}>
                      <input
                        type="checkbox"
                        checked={settings.notificationSms}
                        onChange={(e) => handleInputChange('notificationSms', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F172A]" />
                    </label>
                  </div>

                  {/* WhatsApp Toggle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FAF9F6', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                    <div style={{ paddingRight: 16 }}>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: 0 }}>{t.waAlerts}</h4>
                      <p style={{ fontSize: 15, color: '#64748B', marginTop: 6, margin: 0, lineHeight: '22px' }}>{t.waAlertsDesc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer" style={{ flexShrink: 0 }}>
                      <input
                        type="checkbox"
                        checked={settings.notificationWhatsApp}
                        onChange={(e) => handleInputChange('notificationWhatsApp', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F172A]" />
                    </label>
                  </div>
                </div>
              </div>

            </div>

            {/* GRID 2: READ-ONLY SYSTEM STANDARDS & EDITABLE PREFERENCES */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
              
              {/* System Standards Card (Read-Only) */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 28, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', minHeight: 330 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    {t.systemStandardsTitle}
                  </h3>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: '#FAF9F6',
                    color: '#475569',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: 999,
                    border: '1px solid #E2E8F0'
                  }}>
                    {t.adminControlled}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24, borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', paddingTop: 20, paddingBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F8FAFC' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>{t.minPressure}</span>
                    <strong style={{ color: '#0F172A' }}>0.05 MPa</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F8FAFC' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>{t.maxPressure}</span>
                    <strong style={{ color: '#0F172A' }}>0.35 MPa</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>{t.minFlow}</span>
                    <strong style={{ color: '#0F172A' }}>5 L/min</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>{t.batteryWarning}</span>
                    <strong style={{ color: '#0F172A' }}>20%</strong>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: '#64748B', fontStyle: 'italic', margin: 0 }}>
                  {t.helperText}
                </p>
              </div>

              {/* System Preferences Card (Language & Data Refresh Rate - Editable) */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 28, boxShadow: '0 4px 30px rgba(15,23,42,0.01)', minHeight: 330, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 20 }}>
                <div>
                  <h3 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
                    {t.systemPrefsTitle}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Language Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <label style={{ fontSize: 16, fontWeight: 600, color: '#64748B' }}>{t.langLabel}</label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        style={{ width: '100%', height: 48, border: '1px solid #E5E7EB', borderRadius: 8, padding: '0 12px', fontSize: 14, outline: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="hi">हिन्दी / Hindi</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    {/* Refresh Interval Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <label style={{ fontSize: 16, fontWeight: 600, color: '#64748B' }}>{t.refreshRate}</label>
                      <select
                        value={settings.refreshInterval}
                        onChange={(e) => handleInputChange('refreshInterval', parseInt(e.target.value))}
                        style={{ width: '100%', height: 48, border: '1px solid #E5E7EB', borderRadius: 8, padding: '0 12px', fontSize: 14, outline: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value={5}>Every 5 Seconds (Live Simulation)</option>
                        <option value={15}>Every 15 Minutes</option>
                        <option value={30}>Every 30 Minutes</option>
                        <option value={60}>Every 1 Hour</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SUBMIT BUTTONS (Only preferences are editable) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 12 }}>
              <button
                type="button"
                onClick={handleReset}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', color: '#64748B', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                {t.resetBtn}
              </button>
              <button
                type="submit"
                style={{ backgroundColor: '#0F172A', border: 'none', color: '#FFFFFF', padding: '14px 36px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
              >
                {t.saveBtn}
              </button>
            </div>

          </form>
        </div>
      </main>

      <CommonFooter />
    </div>
  );
};

export default SettingsPage;
