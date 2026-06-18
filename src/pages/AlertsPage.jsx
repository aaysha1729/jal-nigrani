import { useState } from 'react';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';
import { useAuth } from '../context/AuthContext';
import { initialAlerts } from '../data/mockData';

// Past alert history
const alertHistory = [
  { id: 11, severity: 'safe', description: 'Leak repaired at P2 node', descriptionHi: 'P2 नोड पर रिसाव ठीक किया गया', timestamp: 'Yesterday 04:30 PM' },
  { id: 12, severity: 'safe', description: 'P1 sensor calibration completed', descriptionHi: 'P1 सेंसर अंशांकन पूरा हुआ', timestamp: '14 Jun 2026 11:20 AM' },
  { id: 13, severity: 'warning', description: 'Battery replacement at Gateway', descriptionHi: 'गेटवे पर बैटरी प्रतिस्थापन', timestamp: '12 Jun 2026 02:15 PM' },
];

const AlertsPage = () => {
  const { lang } = useAuth();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState('all');

  const handleAcknowledge = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const handleBulkAcknowledge = () => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (activeTab === 'all' || a.severity === activeTab) {
          return { ...a, acknowledged: true };
        }
        return a;
      })
    );
  };

  // Filter logic
  const filteredAlerts = alerts.filter((a) => {
    if (activeTab === 'all') return true;
    return a.severity === activeTab;
  });

  const unacknowledgedCount = filteredAlerts.filter((a) => !a.acknowledged).length;

  // Tab dynamic styling helper
  const getChipStyle = (tab, isActive) => {
    const base = {
      height: 40,
      padding: '0 20px',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      fontFamily: "'Inter', sans-serif",
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    if (tab === 'all') {
      return {
        ...base,
        border: isActive ? 'none' : '1px solid #E5E7EB',
        backgroundColor: isActive ? '#0F172A' : '#FFFFFF',
        color: isActive ? '#FFFFFF' : '#64748B'
      };
    }
    if (tab === 'critical') {
      return {
        ...base,
        border: isActive ? 'none' : '1px solid #DC2626',
        backgroundColor: isActive ? '#DC2626' : '#FFFFFF',
        color: isActive ? '#FFFFFF' : '#DC2626'
      };
    }
    if (tab === 'warning') {
      return {
        ...base,
        border: isActive ? 'none' : '1px solid #F59E0B',
        backgroundColor: isActive ? '#F59E0B' : '#FFFFFF',
        color: isActive ? '#FFFFFF' : '#F59E0B'
      };
    }
    if (tab === 'info') {
      return {
        ...base,
        border: isActive ? 'none' : '1px solid #64748B',
        backgroundColor: isActive ? '#64748B' : '#FFFFFF',
        color: isActive ? '#FFFFFF' : '#64748B'
      };
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', fontFamily: "'Inter', sans-serif" }}>
      <CommonNavbar />

      <main style={{ flexGrow: 1, width: '100%', maxWidth: 1440, margin: '0 auto', paddingTop: 48, paddingBottom: 48, paddingLeft: 64, paddingRight: 64, display: 'flex', flexDirection: 'column' }}>
        {/* Header Section */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64, fontWeight: 500, lineHeight: '72px', color: '#0F172A', marginBottom: 12 }}>
            {lang === 'en' ? 'Alerts Center' : 'चेतावनी केंद्र'}
          </h1>
          <p style={{ fontSize: 22, fontWeight: 400, lineHeight: '32px', color: '#64748B', marginBottom: 32, marginTop: 0 }}>
            {lang === 'en' ? 'Acknowledge, track and resolve infrastructure alerts' : 'बुनियादी ढांचा अलर्ट को ट्रैक, स्वीकार और हल करें'}
          </p>

          <nav style={{ fontSize: 14, fontWeight: 500, color: '#64748B', marginBottom: 0 }}>
            <span>Home</span>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Alerts Center</span>
          </nav>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr]" style={{ gap: 24, alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Alerts Column */}
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
            
            {/* Alerts Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: '44px', color: '#0F172A', margin: 0 }}>
                  {lang === 'en' ? 'Active Alerts' : 'सक्रिय अलर्ट'} ({filteredAlerts.length})
                </h2>
                <div style={{ fontSize: 16, fontWeight: 500, marginTop: 8, color: '#64748B' }}>
                  {unacknowledgedCount} {lang === 'en' ? 'unacknowledged' : 'बिना स्वीकार किए गए अलर्ट'}
                </div>
              </div>

              {unacknowledgedCount > 0 && (
                <button
                  onClick={handleBulkAcknowledge}
                  style={{
                    height: 48,
                    padding: '0 24px',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
                >
                  {lang === 'en' ? 'Acknowledge All' : 'सभी स्वीकारें'}
                </button>
              )}
            </div>

            {/* Filter Tabs Chips Toolbar */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
              {['all', 'critical', 'warning', 'info'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={getChipStyle(tab, activeTab === tab)}
                >
                  {tab === 'all' && (lang === 'en' ? 'All' : 'सभी')}
                  {tab === 'critical' && (lang === 'en' ? 'Critical' : 'गंभीर')}
                  {tab === 'warning' && (lang === 'en' ? 'Warning' : 'चेतावनी')}
                  {tab === 'info' && (lang === 'en' ? 'Info' : 'सामान्य')}
                </button>
              ))}
            </div>

            {/* Alerts List */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredAlerts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748B', fontSize: 18 }}>
                  {lang === 'en' ? 'No alerts found in this category.' : 'कोई अलर्ट नहीं मिला।'}
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    style={{
                      position: 'relative',
                      padding: 28,
                      marginBottom: 16,
                      border: '1px solid #E5E7EB',
                      borderRadius: 16,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: alert.acknowledged ? '#F9FAFB' : '#FFFFFF',
                      opacity: alert.acknowledged ? 0.75 : 1,
                      borderLeft: alert.severity === 'critical' ? '6px solid #DC2626' : alert.severity === 'warning' ? '6px solid #F59E0B' : '6px solid #16A34A',
                      boxShadow: alert.acknowledged ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Left Section: Alert Content */}
                    <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      
                      {/* Meta information row (badge, time, village) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <span
                          style={{
                            height: 26,
                            padding: '0 10px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textTransform: 'capitalize',
                            backgroundColor: alert.severity === 'critical' ? '#FEF2F2' : alert.severity === 'warning' ? '#FFF7ED' : '#ECFDF5',
                            color: alert.severity === 'critical' ? '#DC2626' : alert.severity === 'warning' ? '#F59E0B' : '#16A34A',
                            border: alert.severity === 'critical' ? '1px solid #FEE2E2' : alert.severity === 'warning' ? '1px solid #FFEDD5' : '1px solid #D1FAE5'
                          }}
                        >
                          {alert.severity === 'info' ? 'Safe' : (alert.severity === 'critical' ? 'Critical' : 'Warning')}
                        </span>
                        
                        <span style={{ fontSize: 14, fontWeight: 500, color: '#64748B' }}>
                          {alert.timestamp}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: '#64748B' }}>
                          {alert.village || 'रामपुर / Rampur'}
                        </span>
                      </div>

                      <p style={{ fontSize: 24, fontWeight: 700, lineHeight: '32px', marginTop: 0, marginBottom: 4, color: '#0F172A' }}>
                        {alert.description}
                      </p>
                      
                      <p style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', marginTop: 0, marginBottom: 0, color: '#64748B' }}>
                        {alert.descriptionHi}
                      </p>

                      {alert.detail && (
                        <p style={{ fontSize: 14, color: '#475569', fontFamily: 'monospace', marginTop: 12, marginBottom: 0, backgroundColor: '#FAF9F6', padding: '8px 12px', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                          {alert.detail}
                        </p>
                      )}

                      {alert.escalation && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16A34A', fontSize: 14, fontWeight: 600, marginTop: 12 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                          </svg>
                          <span>{alert.escalation}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Section: Action Button */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {alert.acknowledged ? (
                        <span
                          style={{
                            height: 44,
                            padding: '0 20px',
                            borderRadius: 10,
                            fontSize: 15,
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F1F5F9',
                            color: '#94A3B8'
                          }}
                        >
                          {lang === 'en' ? 'Acknowledged' : 'स्वीकृत'}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAcknowledge(alert.id)}
                          style={{
                            height: 44,
                            padding: '0 20px',
                            borderRadius: 10,
                            fontSize: 15,
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: '#F97316',
                            color: '#FFFFFF',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                          onMouseOut={(e) => e.currentTarget.style.opacity = 1}
                        >
                          {lang === 'en' ? 'Acknowledge' : 'स्वीकारें'}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Escalation Protocol Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 28, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
              <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: '40px', color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
                {lang === 'en' ? 'Escalation Protocol' : 'स्वचालित एस्केलेशन'}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Timeline Steps Container */}
                <div style={{ position: 'relative', borderLeft: '2px solid #E5E7EB', marginLeft: 16, paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Step 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: -48,
                        top: 0,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#0F172A',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700
                      }}
                    >
                      1
                    </span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#0F172A', margin: 0 }}>
                      Field Operator / जल वाहिनी
                    </h4>
                    <p style={{ fontSize: 15, fontWeight: 400, lineHeight: '22px', color: '#64748B', marginTop: 4, marginBottom: 0 }}>
                      Immediate SMS alert sent to inspect node locally.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: -48,
                        top: 0,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700
                      }}
                    >
                      2
                    </span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#0F172A', margin: 0 }}>
                      Panchayat Level / ग्राम पंचायत
                    </h4>
                    <p style={{ fontSize: 15, fontWeight: 400, lineHeight: '22px', color: '#64748B', marginTop: 4, marginBottom: 0 }}>
                      Escalated via WhatsApp if unresolved after 30 mins.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: -48,
                        top: 0,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700
                      }}
                    >
                      3
                    </span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#0F172A', margin: 0 }}>
                      Mandal / ब्लॉक स्तर
                    </h4>
                    <p style={{ fontSize: 15, fontWeight: 400, lineHeight: '22px', color: '#64748B', marginTop: 4, marginBottom: 0 }}>
                      Auto-escalation to Mandal Engineer after 2 hours.
                    </p>
                  </div>
                </div>

                {/* Note outside the timeline (no border line) */}
                <div style={{ paddingLeft: 16, marginTop: 4 }}>
                  <p style={{ fontSize: 14, color: '#64748B', fontStyle: 'italic', margin: 0 }}>
                    Critical alert escalated to district officer after 4 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Resolution History Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7EB', padding: 28, boxShadow: '0 4px 30px rgba(15,23,42,0.01)' }}>
              <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: '40px', color: '#0F172A', marginBottom: 24, marginTop: 0 }}>
                {lang === 'en' ? 'Resolution History' : 'समाधान इतिहास'}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {alertHistory.map((hist, index) => (
                  <div
                    key={hist.id}
                    style={{
                      paddingTop: index === 0 ? 0 : 16,
                      paddingBottom: 16,
                      borderBottom: index === alertHistory.length - 1 ? 'none' : '1px solid #F1F5F9',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          backgroundColor: '#ECFDF5',
                          color: '#16A34A',
                          padding: '2px 8px',
                          borderRadius: 4,
                          border: '1px solid #D1FAE5'
                        }}
                      >
                        {lang === 'en' ? 'Resolved' : 'हल किया गया'}
                      </span>
                      <span style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>
                        {hist.timestamp}
                      </span>
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      {hist.description}
                    </h4>
                    <p style={{ fontSize: 14, color: '#64748B', margin: 0, fontWeight: 500 }}>
                      {hist.descriptionHi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <CommonFooter showStatus={true} />
    </div>
  );
};

export default AlertsPage;
