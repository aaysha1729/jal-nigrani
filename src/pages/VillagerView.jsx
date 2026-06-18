import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CommonNavbar from "../components/CommonNavbar";
import CommonFooter from "../components/CommonFooter";
import ReportIssueModal from "../components/ReportIssueModal";

function VillagerView() {
  const [waterSafe, setWaterSafe] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useAuth();

  const textDict = {
    en: {
      location: "Rampur Village Portal",
      waterSafeTitle: "Water is Safe to Drink",
      waterSafeDesc: "Last checked: Today, 10:30 AM. Safe for all household and cooking uses.",
      waterUnsafeTitle: "Water is Unsafe",
      waterUnsafeDesc: "Contamination alert. Please boil water thoroughly before use.",
      flowNormal: "Water is Flowing",
      flowNormalDesc: "Supply active since 06:00 AM",
      leakAlert: "Pipe leakage detected near P2 zone. Repairs are underway.",
      leakAlertTitle: "System Warning",
      receivedToday: "Today's Water Supply",
      receivedTodayVal: "450 Litres Supplied",
      receivedStatus: "Lower than usual volume",
      reportButton: "Report a Problem",
      needHelpTitle: "Need Help?",
      needHelpDesc: "If you notice water leaks, low pressure, or quality issues in your area, please report it or contact our helpline.",
      helplineLabel: "TOLL-FREE HELPLINE",
      latestUpdatesTitle: "Latest Updates Today",
      updateQuality: "Water quality checked and verified safe",
      updateFlow: "Water supply started for the village",
      updateLeak: "Repair team dispatched for P2 pipeline leakage"
    },
    hi: {
      location: "रामपुर ग्राम पोर्टल",
      waterSafeTitle: "पीने का पानी सुरक्षित है",
      waterSafeDesc: "आखिरी जांच: आज, सुबह 10:30। घरेलू और खाना पकाने के उपयोग के लिए सुरक्षित।",
      waterUnsafeTitle: "पानी असुरक्षित है",
      waterUnsafeDesc: "संदूषण चेतावनी। उपयोग से पहले पानी को अच्छी तरह उबालें।",
      flowNormal: "पानी आ रहा है",
      flowNormalDesc: "आपूर्ति सुबह 06:00 बजे से सक्रिय",
      leakAlert: "पी2 जोन के पास पाइप रिसाव का पता चला है। मरम्मत का काम जारी है।",
      leakAlertTitle: "प्रणाली चेतावनी",
      receivedToday: "आज की पानी आपूर्ति",
      receivedTodayVal: "450 लीटर आपूर्ति की गई",
      receivedStatus: "सामान्य से कम आपूर्ति",
      reportButton: "समस्या दर्ज करें",
      needHelpTitle: "सहायता चाहिए?",
      needHelpDesc: "यदि आप अपने क्षेत्र में पानी के रिसाव, कम दबाव या गुणवत्ता की समस्याओं को देखते हैं, तो कृपया इसकी रिपोर्ट करें या हमारी हेल्पलाइन पर संपर्क करें.",
      helplineLabel: "टोल-फ्री हेल्पलाइन",
      latestUpdatesTitle: "आज के नवीनतम अपडेट",
      updateQuality: "पानी की गुणवत्ता की जांच की गई और सुरक्षित पाई गई",
      updateFlow: "गांव के लिए जलापूर्ति शुरू की गई",
      updateLeak: "पी2 पाइपलाइन रिसाव के लिए मरम्मत टीम भेजी गई"
    }
  };

  const t = textDict[lang] || textDict['en'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif" }}>
      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', padding: '32px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Page Header */}
        <div style={{ marginBottom: 12 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 500, color: '#0F172A', marginBottom: 8, lineHeight: 1.1 }}>
            {lang === 'en' ? 'Rampur Village' : 'रामपुर गांव'}
          </h1>
          <p style={{ fontSize: 20, fontWeight: 500, color: '#64748B', margin: 0 }}>
            {t.location}
          </p>
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
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: 22, height: 22, color: '#3B82F6' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>
                {t.flowNormal}
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#64748B', margin: '16px 0 0 0', lineHeight: '20px', fontWeight: 500 }}>
              {t.flowNormalDesc}
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
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  color: '#DC2626',
                  padding: '4px 10px',
                  borderRadius: 20
                }}>
                  {t.receivedStatus}
                </span>
              </div>
              <div style={{ height: 8, overflow: 'hidden', borderRadius: 999, backgroundColor: '#E5E7EB', marginTop: 8 }}>
                <div style={{ height: '100%', width: '45%', backgroundColor: '#F59E0B', borderRadius: 999 }} />
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#64748B', margin: '12px 0 0 0', fontWeight: 600 }}>
              {t.receivedTodayVal}
            </p>
          </div>
        </div>

        {/* System Warning Attention Section: Full Width */}
        <div style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderLeft: '6px solid #F59E0B',
          borderRadius: 16,
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.03)'
        }}>
          <svg style={{ width: 36, height: 36, color: '#F59E0B', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: '#B45309', margin: '0 0 4px 0' }}>
              {t.leakAlertTitle}
            </h4>
            <p style={{ fontSize: 16, color: '#78350F', margin: 0, fontWeight: 500 }}>
              {t.leakAlert}
            </p>
          </div>
        </div>

        {/* Bottom Split Row: Latest Updates & Need Help */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]" style={{ gap: 24 }}>
          {/* Latest Updates Timeline */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 32, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
              {t.latestUpdatesTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Quality Check Update */}
              <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#16A34A', zIndex: 10, marginTop: 6 }} />
                  <div style={{ width: 2, flexGrow: 1, backgroundColor: '#E2E8F0', marginTop: 4, marginBottom: -24 }} />
                </div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>10:30 AM</span>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>{t.updateQuality}</p>
                </div>
              </div>

              {/* Flow Started Update */}
              <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#16A34A', zIndex: 10, marginTop: 6 }} />
                  <div style={{ width: 2, flexGrow: 1, backgroundColor: '#E2E8F0', marginTop: 4, marginBottom: -24 }} />
                </div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>06:00 AM</span>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>{t.updateFlow}</p>
                </div>
              </div>

              {/* Leak Repair Dispatched Update */}
              <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B', zIndex: 10, marginTop: 6 }} />
                </div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>{lang === 'en' ? 'Yesterday' : 'कल'}</span>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>{t.updateLeak}</p>
                </div>
              </div>
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
