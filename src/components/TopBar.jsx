import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopBar = ({ title, subtitle, lastUpdated }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-white px-8">
      <div>
        <h2 className="text-2xl font-extrabold leading-tight text-navy">{title}</h2>
        {subtitle && <p className="text-sm font-bold text-text-secondary">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-8 text-xl text-text">
        {lastUpdated && <span>Last Refresh: {lastUpdated}</span>}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xl hover:text-critical"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="9" r="3" />
            <path d="M7 20c.9-3 2.5-4.5 5-4.5S16.1 17 17 20" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
