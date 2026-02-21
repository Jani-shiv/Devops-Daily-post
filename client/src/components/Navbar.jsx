import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineChartBar, HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Daily Post', icon: <HiOutlineHome size={20} /> },
    { to: '/tracker', label: 'Tracker', icon: <HiOutlineCalendar size={20} /> },
    { to: '/progress', label: 'Progress', icon: <HiOutlineChartBar size={20} /> },
    { to: '/profile', label: 'Profile', icon: <HiOutlineUser size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-2xl">🚀</span>
          <span className="gradient-text font-bold text-lg hidden sm:inline">Daily DevOps Diary</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all no-underline ${
                location.pathname === link.to
                  ? 'text-[var(--accent-cyan)] bg-[rgba(6,214,160,0.1)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              {link.icon}
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          ))}

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-red)] hover:bg-[rgba(239,68,68,0.1)] transition-all cursor-pointer border-0 bg-transparent ml-2"
          >
            <HiOutlineLogout size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
