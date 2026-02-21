import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  if (!user) return null;

  const links = [
    { to: '/daily', label: 'Daily Post', icon: '✍️' },
    { to: '/tracker', label: 'Tracker', icon: '📅' },
    { to: '/progress', label: 'Progress', icon: '📊' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        maxWidth: 960, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56,
      }}>
        <Link to="/daily" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🚀</span>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--white)' }}>
            DevOps <span style={{ color: 'var(--green)' }}>Diary</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 500,
                color: pathname === link.to ? 'var(--green)' : 'var(--gray)',
                background: pathname === link.to ? 'var(--green-bg)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ marginRight: 4 }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <button
            onClick={logout}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--gray-muted)', padding: '6px 12px', borderRadius: 8,
              cursor: 'pointer', fontSize: '0.8rem', marginLeft: 8,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--red)'; e.target.style.color = 'var(--red)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--gray-muted)'; }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
