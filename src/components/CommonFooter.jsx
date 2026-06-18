import { useAuth } from '../context/AuthContext';

export default function CommonFooter({ showStatus = false }) {
  const { lang } = useAuth();
  
  const texts = {
    en: {
      govIndia: "Department of Water Resources, Government of India",
      helpline: "Helpline",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",
      lora: "LoRa Network",
      online: "Online",
      cloud: "Cloud Connectivity",
      active: "Active",
      system: "System Status",
      operational: "Operational"
    },
    hi: {
      govIndia: "जल संसाधन विभाग, भारत सरकार",
      helpline: "हेल्पलाइन",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      contact: "संपर्क करें",
      lora: "लोरा नेटवर्क",
      online: "ऑनलाइन",
      cloud: "क्लाउड कनेक्टिविटी",
      active: "सक्रिय",
      system: "सिस्टम स्थिति",
      operational: "परिचालन"
    }
  };

  const t = texts[lang] || texts['en'];

  return (
    <footer style={{ width: '100%', borderTop: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', zIndex: 50, flexShrink: 0 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', height: 56, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 500, color: '#64748B', fontFamily: "'Inter', sans-serif" }}>
        {showStatus ? (
          <>
            {/* Left side: Network Status Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748B' }}>
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" fill="currentColor" />
              </svg>
              <span>
                {t.lora}: <span style={{ color: '#16A34A', fontWeight: 600 }}>{t.online}</span>
              </span>
              <span style={{ color: '#CBD5E1', margin: '0 4px' }}>•</span>
              <span>
                {t.cloud}: <span style={{ color: '#16A34A', fontWeight: 600 }}>{t.active}</span>
              </span>
              <span style={{ color: '#CBD5E1', margin: '0 4px' }}>•</span>
              <span>
                {t.system}: <span style={{ color: '#16A34A', fontWeight: 600 }}>{t.operational}</span>
              </span>
            </div>
            
            {/* Right side: Govt Info & Helpline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span>{t.govIndia}</span>
              <span style={{ color: '#E2E8F0' }}>|</span>
              <span>{t.helpline}: 1800-180-1551</span>
            </div>
          </>
        ) : (
          <>
            <span>{t.govIndia}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span>{t.helpline}: 1800-180-1551</span>
              <button style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>{t.privacy}</button>
              <button style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>{t.terms}</button>
              <button style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>{t.contact}</button>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
