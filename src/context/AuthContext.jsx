import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

/* ===== Mock Credentials ===== */
const MOCK_USERS = [
  { username: 'villager1', password: 'pass123', role: 'villager', name: 'राम कुमार / Ram Kumar', village: 'रामपुर / Rampur' },
  { username: 'jalbahini1', password: 'pass123', role: 'jal_bahini', name: 'सुनीता देवी / Sunita Devi', village: 'रामपुर / Rampur' },
  { username: 'officer1', password: 'pass123', role: 'district_officer', name: 'अनिल शर्मा / Anil Sharma', district: 'मेवात / Mewat' },
];

/* Role → home route mapping */
export const ROLE_ROUTES = {
  villager: '/village-status',
  jal_bahini: '/dashboard',
  district_officer: '/officer-dashboard',
};

/* Mock JWT generation (base64 encode the user data) */
const generateMockToken = (user) => {
  const payload = { ...user, iat: Date.now(), exp: Date.now() + 86400000 };
  const jsonStr = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(jsonStr)));
};

/* Decode mock JWT */
const decodeMockToken = (token) => {
  try {
    const decodedStr = decodeURIComponent(escape(atob(token)));
    const payload = JSON.parse(decodedStr);
    if (payload.exp && payload.exp > Date.now()) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jn_token');
    if (token) {
      const decoded = decodeMockToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        localStorage.removeItem('jn_token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((username, password) => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      throw new Error('गलत उपयोगकर्ता नाम या पासवर्ड / Invalid username or password');
    }
    const { password: _, ...userData } = found;
    const token = generateMockToken(userData);
    localStorage.setItem('jn_token', token);
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jn_token');
    setUser(null);
  }, []);

  const [lang, setLangState] = useState(() => localStorage.getItem('jn_lang') || 'en');

  const setLang = useCallback((newLang) => {
    localStorage.setItem('jn_lang', newLang);
    setLangState(newLang);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null,
        lang,
        setLang
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
