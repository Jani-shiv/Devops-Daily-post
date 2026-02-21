import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data.user);
      toast.success('Welcome back! 🚀');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'radial-gradient(ellipse at top, #111827 0%, #0a0e1a 70%)' }}>
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🚀</span>
          <h1 className="gradient-text text-3xl font-bold">Daily DevOps Diary</h1>
          <p className="text-sm text-[var(--text-muted)] mt-2">Master DevOps. One post at a time.</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  type="email"
                  className="input-dark pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  type="password"
                  className="input-dark pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0a0e1a] border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[var(--accent-cyan)] hover:underline no-underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
