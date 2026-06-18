import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ navItems = [], title = 'AquaTrack', subtitle = 'Field Operator Portal', emergencyButton = false }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 flex w-80 flex-col border-r border-[#0B2945] bg-[#062B49] text-white">
      <div className="px-8 py-9">
        <h1 className="text-3xl font-extrabold leading-none">{title}</h1>
        <p className="mt-2 text-lg font-bold text-[#9CB4D8]">{subtitle}</p>
      </div>

      <nav className="flex-1 px-4 py-16">
        <ul className="space-y-4">
          {navItems.filter((item) => item.label !== 'Settings').map((item, idx) => (
            <li key={`${item.path}-${idx}`}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-md px-4 py-3 text-lg font-extrabold transition-colors ${
                    isActive
                      ? 'bg-white/12 text-white'
                      : 'text-[#9CB4D8] hover:bg-white/8 hover:text-white'
                  }`
                }
              >
                <span className="grid h-8 w-8 place-items-center text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-8 px-8 pb-8">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-4 text-lg font-extrabold ${
              isActive ? 'text-white' : 'text-[#9CB4D8] hover:text-white'
            }`
          }
        >
          <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </NavLink>

        {emergencyButton && (
          <button
            type="button"
            className="w-full rounded-md bg-[#FFA12A] px-5 py-4 text-xl leading-snug text-[#653800] hover:bg-saffron"
          >
            Initiate Emergency<br />Supply
          </button>
        )}

        <button
          onClick={handleLogout}
          className="sr-only"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
