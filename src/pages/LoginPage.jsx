import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLE_ROUTES } from '../context/AuthContext';
import CommonNavbar from '../components/CommonNavbar';
import CommonFooter from '../components/CommonFooter';

const GlobeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const AntennaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12a10 10 0 0 1 18 0" />
    <path d="M5 12a7 7 0 0 1 14 0" />
    <path d="M8 12a4 4 0 0 1 8 0" />
    <line x1="12" y1="12" x2="12" y2="20" />
  </svg>
);

const BellIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChartBarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="8" rx="1" />
    <rect x="10" y="8" width="4" height="12" rx="1" />
    <rect x="17" y="4" width="4" height="16" rx="1" />
  </svg>
);

const TRANSLATIONS = {
  en: {
    tagline: "SECURE  •  RELIABLE  •  TRANSPARENT",
    heroHeading1: "जल निगरानी",
    heroHeading2: "Water Monitoring for Rural Infrastructure",
    heroDescription: "Real time monitoring of pressure, flow, water quality and distribution systems across rural water networks. Built for transparency, reliability and public infrastructure management.",
    usernameLabel: "Username or Email",
    usernamePlaceholder: "Enter your credentials",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    login: "Sign In",
    loggingIn: "Signing in...",
    publicAccess: "Public Access Portal",
    requestSupport: "Request Support",
    lora: "LoRa Network",
    cloud: "Cloud Connectivity",
    system: "System Status",
    online: "Online",
    active: "Active",
    operational: "Operational",
    helpline: "Helpline",
    govIndia: "Department of Water Resources, Government of India",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us",
    featuresTitle: "Designed for trust and clarity.",
    featuresSubtitle: "We monitor water quality and distribution with absolute transparency.",
    feat1Title: "Real Time Monitoring",
    feat1Text: "Comprehensive tracking of pressure, flow, and quality across rural supply systems with low latency for critical infrastructure oversight.",
    feat2Title: "Smart Alerts",
    feat2Text: "Automated detection of leakage, contamination, and supply interruptions with multi-channel notification protocols for rapid field response.",
    feat3Title: "Analytics & Reports",
    feat3Text: "Visualize historical trends and compliance data. Leverage predictive maintenance models to address issues before failures occur."
  },
  hi: {
    tagline: "सुरक्षित  •  विश्वसनीय  •  पारदर्शी",
    heroHeading1: "जल निगरानी",
    heroHeading2: "Water Monitoring for Rural Infrastructure",
    heroDescription: "ग्रामीण जल नेटवर्क में दबाव, प्रवाह, पानी की गुणवत्ता और वितरण प्रणालियों की वास्तविक समय में निगरानी। पारदर्शिता, विश्वसनीयता और सार्वजनिक बुनियादी ढांचा प्रबंधन के लिए निर्मित।",
    usernameLabel: "उपयोगकर्ता नाम या ईमेल",
    usernamePlaceholder: "अपनी साख दर्ज करें",
    passwordLabel: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    rememberMe: "याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    login: "साइन इन करें",
    loggingIn: "लॉग इन हो रहा है...",
    publicAccess: "सार्वजनिक पोर्टल",
    requestSupport: "सहायता अनुरोध",
    lora: "लोरा नेटवर्क",
    cloud: "क्लाउड कनेक्टिविटी",
    system: "सिस्टम की स्थिति",
    online: "ऑनलाइन",
    active: "सक्रिय",
    operational: "सक्रिय",
    helpline: "हेल्पलाइन",
    govIndia: "जल संसाधन विभाग, भारत सरकार",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    contact: "संपर्क करें",
    featuresTitle: "विश्वास और स्पष्टता के लिए निर्मित।",
    featuresSubtitle: "हम पूर्ण पारदर्शिता के साथ पानी की गुणवत्ता और वितरण की निगरानी करते हैं।",
    feat1Title: "वास्तविक समय की निगरानी",
    feat1Text: "महत्वपूर्ण बुनियादी ढांचे की निगरानी के लिए कम विलंबता के साथ ग्रामीण आपूर्ति प्रणालियों में दबाव, प्रवाह और गुणवत्ता की व्यापक ट्रैकिंग।",
    feat2Title: "स्मार्ट अलर्ट",
    feat2Text: "त्वरित क्षेत्र प्रतिक्रिया के लिए बहु-चैनल अधिसूचना प्रोटोकॉल के साथ रिसाव, संदूषण और आपूर्ति रुकावटों का स्वचालित पता लगाना।",
    feat3Title: "विश्लेषण और रिपोर्ट",
    feat3Text: "ऐतिहासिक प्रवृत्तियों और अनुपालन डेटा की कल्पना करें। विफलताओं से पहले मुद्दों के समाधान के लिए पूर्वानुमानित रखरखाव मॉडल का लाभ उठाएं।"
  }
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, user, isAuthenticated, lang, setLang } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ROLE_ROUTES[user.role], { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedInUser = await login(username, password);
      navigate(ROLE_ROUTES[loggedInUser.role], { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublicAccess = async () => {
    setError('');
    setLoading(true);
    try {
      await login('villager1', 'pass123');
      navigate('/village-status', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to access public portal.');
    } finally {
      setLoading(false);
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6', position: 'relative', overflowX: 'hidden', userSelect: 'none' }}>

      {/* Background decorative circles */}
      <div style={{ position: 'absolute', left: 0, top: '15%', width: 150, height: 400, borderTopRightRadius: 9999, borderBottomRightRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: 0, top: '35%', width: 150, height: 400, borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999, backgroundColor: '#EFECE6', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />

      <CommonNavbar />

      {/* ===== HERO SECTION ===== */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 40px 20px 40px', position: 'relative', zIndex: 10 }}>

        {/* Tagline */}
        <p style={{ fontSize: 16, fontWeight: 700, color: '#959DAA', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 32, fontFamily: "'Inter', sans-serif" }}>
          {t.tagline}
        </p>

        {/* Hero Heading */}
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 96, fontWeight: 300, color: '#1E2530', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
          {t.heroHeading1}
        </h1>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 400, fontStyle: 'italic', color: '#5A6270', marginBottom: 32 }}>
          {t.heroHeading2}
        </p>

        {/* Description */}
        <p style={{ fontSize: 20, fontWeight: 300, color: '#5A6270', lineHeight: 1.7, maxWidth: 680, margin: '0 auto 56px', fontFamily: "'Inter', sans-serif" }}>
          {t.heroDescription}
        </p>

        {/* ===== LOGIN CARD ===== */}
        <div style={{ width: '100%', maxWidth: 680, backgroundColor: '#FFFFFF', border: '1px solid #EFECE6', borderRadius: 24, boxShadow: '0 4px 30px rgba(30,37,48,0.02)', padding: '64px 56px', marginBottom: 44, textAlign: 'left' }}>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label style={{ display: 'block', fontSize: 20, fontWeight: 600, color: '#5A6270', marginBottom: 14, fontFamily: "'Inter', sans-serif" }}>{t.usernameLabel}</label>
            <div style={{ position: 'relative', marginBottom: 28 }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 20, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <UserIcon style={{ width: 22, height: 22, color: '#959DAA' }} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.usernamePlaceholder}
                required
                style={{ width: '100%', height: 64, paddingLeft: 60, paddingRight: 20, border: '1px solid #E2DDD5', borderRadius: 10, backgroundColor: '#FFFFFF', fontSize: 20, color: '#1E2530', outline: 'none', fontFamily: "'Inter', sans-serif" }}
                onFocus={(e) => { e.target.style.borderColor = '#1E2530'; e.target.style.boxShadow = '0 0 0 2px rgba(30,37,48,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E2DDD5'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Password */}
            <label style={{ display: 'block', fontSize: 20, fontWeight: 600, color: '#5A6270', marginBottom: 14, fontFamily: "'Inter', sans-serif" }}>{t.passwordLabel}</label>
            <div style={{ position: 'relative', marginBottom: 28 }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 20, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <LockIcon style={{ width: 22, height: 22, color: '#959DAA' }} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                required
                style={{ width: '100%', height: 64, paddingLeft: 60, paddingRight: 60, border: '1px solid #E2DDD5', borderRadius: 10, backgroundColor: '#FFFFFF', fontSize: 20, color: '#1E2530', outline: 'none', fontFamily: "'Inter', sans-serif" }}
                onFocus={(e) => { e.target.style.borderColor = '#1E2530'; e.target.style.boxShadow = '0 0 0 2px rgba(30,37,48,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E2DDD5'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {showPassword ? <EyeOffIcon style={{ width: 22, height: 22, color: '#959DAA' }} /> : <EyeIcon style={{ width: 22, height: 22, color: '#959DAA' }} />}
              </button>
            </div>

            {/* Remember Me / Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, color: '#5A6270', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                <input type="checkbox" style={{ width: 20, height: 20, accentColor: '#1E2530', cursor: 'pointer' }} />
                {t.rememberMe}
              </label>
              <button type="button" style={{ background: 'none', border: 'none', fontSize: 18, fontWeight: 600, color: '#5A6270', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                {t.forgotPassword}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ backgroundColor: '#FAF3F3', border: '1px solid rgba(160,82,82,0.1)', color: '#A05252', fontSize: 18, borderRadius: 10, padding: 16, textAlign: 'center', fontWeight: 500, marginBottom: 22, fontFamily: "'Inter', sans-serif" }}>
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', height: 64, backgroundColor: '#1E2530', color: '#FFFFFF', fontSize: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1, fontFamily: "'Inter', sans-serif" }}
            >
              {loading ? t.loggingIn : t.login}
            </button>
          </form>

          {/* Citizen Public Dashboard Link */}
          <div style={{ marginTop: 28, textAlign: 'center', fontSize: 18, color: '#64748B', fontFamily: "'Inter', sans-serif" }}>
            {lang === 'en' ? 'Looking for village water status?' : 'गांव के पानी की स्थिति देखना चाहते हैं?'} {' '}
            <span
              onClick={() => navigate('/village-status')}
              style={{ color: '#0F172A', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
            >
              {lang === 'en' ? 'Visit the Public Dashboard.' : 'सार्वजनिक डैशबोर्ड पर जाएं।'}
            </span>
          </div>

          {/* Public Access / Support */}
          <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid #E2DDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, fontSize: 18, color: '#5A6270' }}>
            <button onClick={handlePublicAccess} style={{ background: 'none', border: 'none', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 18, color: '#5A6270', cursor: 'pointer' }}>
              {t.publicAccess}
            </button>
            <span style={{ color: '#E2DDD5' }}>|</span>
            <button style={{ background: 'none', border: 'none', fontSize: 18, color: '#5A6270', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              {t.requestSupport}
            </button>
          </div>
        </div>

        {/* Status indicators */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 28, fontSize: 16, color: '#5A6270', fontFamily: "'Inter', sans-serif" }}>
          <span>{t.lora}: <strong style={{ color: '#1E2530' }}>{t.online}</strong></span>
          <span style={{ color: '#E2DDD5' }}>•</span>
          <span>{t.cloud}: <strong style={{ color: '#1E2530' }}>{t.active}</strong></span>
          <span style={{ color: '#E2DDD5' }}>•</span>
          <span>{t.system}: <strong style={{ color: '#1E2530' }}>{t.operational}</strong></span>
        </div>
      </main>

      {/* ===== FEATURES TAGLINE ===== */}
      <section style={{ width: '100%', borderTop: '1px solid #EFECE6', padding: '40px 40px 60px 40px', backgroundColor: '#FAF9F6', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 44, fontWeight: 300, color: '#1E2530', marginBottom: 20, fontStyle: 'italic' }}>{t.featuresTitle}</h2>
          <p style={{ fontSize: 20, color: '#5A6270', fontWeight: 300, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{t.featuresSubtitle}</p>
        </div>
      </section>

      <CommonFooter />
    </div>
  );
}
