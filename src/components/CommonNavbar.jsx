import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GlobeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>
);

export default function CommonNavbar() {
  const { user, logout, lang, setLang } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (!user) {
      return [
        { label: lang === 'en' ? 'Dashboard' : 'डैशबोर्ड', path: '/village-status' },
        { label: lang === 'en' ? 'Infrastructure' : 'बुनियादी ढांचा', path: 'auth-required' },
        { label: lang === 'en' ? 'Water Quality' : 'जल गुणवत्ता', path: 'auth-required' },
        { label: lang === 'en' ? 'Reports' : 'रिपोर्ट', path: 'auth-required' },
      ];
    }
    if (user.role === 'jal_bahini') {
      return [
        { label: lang === 'en' ? 'Dashboard' : 'डैशबोर्ड', path: '/dashboard' },
        { label: lang === 'en' ? 'Pipeline Monitor' : 'पाइपलाइन निगरानी', path: '/pipeline' },
        { label: lang === 'en' ? 'Alerts' : 'अलर्ट', path: '/alerts' },
        { label: lang === 'en' ? 'Reports' : 'रिपोर्ट', path: '/reports' },
        { label: lang === 'en' ? 'Settings' : 'सेटिंग्स', path: '/settings' },
      ];
    }
    if (user.role === 'district_officer') {
      return [
        { label: lang === 'en' ? 'District Overview' : 'जिला अवलोकन', path: '/officer-dashboard' },
      ];
    }
    if (user.role === 'villager') {
      return [
        { label: lang === 'en' ? 'Village Status' : 'गांव की स्थिति', path: '/village-status' },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <nav style={{ width: '100%', borderBottom: '1px solid #E5E7EB', flexShrink: 0, zIndex: 100, backgroundColor: '#FFFFFF', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 72, padding: '0 32px' }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}>
          <span
            onClick={() => user ? navigate(user.role === 'villager' ? '/village-status' : user.role === 'district_officer' ? '/officer-dashboard' : '/dashboard') : navigate('/login')}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em', cursor: 'pointer' }}
          >
            Jal Nigrani
          </span>
          {user && (
            <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontFamily: "'Inter', sans-serif", borderLeft: '1px solid #E5E7EB', paddingLeft: 12 }}>
              {user.role === 'villager' ? (lang === 'en' ? 'Public' : 'सार्वजनिक') : user.role === 'district_officer' ? (lang === 'en' ? 'Officer' : 'अधिकारी') : (lang === 'en' ? 'Jal Bahini' : 'जल वाहिनी')}
            </span>
          )}
        </div>

        {/* Middle: Centered Nav Links */}
        <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: 40, justifyContent: 'center' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isDashboard = item.path === '/village-status' || item.path === '/dashboard';
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.path === 'auth-required') {
                    setLoginModalOpen(true);
                  } else {
                    navigate(item.path);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: isDashboard ? 700 : 600,
                  color: isActive ? '#0F172A' : (isDashboard && !user ? '#0F172A' : '#64748B'),
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  borderBottom: isActive ? '2px solid #0F172A' : '2px solid transparent',
                  padding: '8px 0',
                  marginTop: 2
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Lang Toggle & Logout */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 24 }}>
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
          >
            <GlobeIcon className="w-4 h-4" style={{ width: 18, height: 18, color: '#64748B' }} />
            English / हिन्दी
          </button>

          {user && (
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 14,
                fontWeight: 600,
                color: '#DC2626',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              {lang === 'en' ? 'Logout' : 'लॉगआउट'}
            </button>
          )}
        </div>
      </div>

      {/* Login Required Modal */}
      {loginModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            padding: 36,
            width: '90%',
            maxWidth: 500,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Lock Icon */}
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <svg style={{ width: 28, height: 28, color: '#EF4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0', fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Login Required' : 'लॉगिन आवश्यक'}
            </h3>
            
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: '24px', margin: '0 0 28px 0', fontFamily: "'Inter', sans-serif" }}>
              {lang === 'en'
                ? 'This section contains operational infrastructure data and is only available to authorized personnel.'
                : 'यह अनुभाग परिचालन बुनियादी ढांचा डेटा प्रदान करता है और केवल अधिकृत कर्मियों के लिए उपलब्ध है।'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  navigate('/login');
                }}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  fontSize: 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
              >
                {lang === 'en' ? 'Sign In' : 'साइन इन करें'}
              </button>
              
              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  navigate('/village-status');
                }}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#64748B',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                {lang === 'en' ? 'Return to Public Dashboard' : 'सार्वजनिक डैशबोर्ड पर लौटें'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
