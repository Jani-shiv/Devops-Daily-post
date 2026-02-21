import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const PLATFORMS = ['LinkedIn', 'Twitter', 'YouTube', 'Blog', 'Dev.to', 'Hashnode'];
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: '', brand_name: '', platforms: [], skill_level: 'Beginner' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        brand_name: user.brand_name || '',
        platforms: user.platforms || [],
        skill_level: user.skill_level || 'Beginner',
      });
    }
  }, [user]);

  const togglePlatform = (p) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(p) ? prev.platforms.filter((x) => x !== p) : [...prev.platforms, p],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/profile', form);
      setUser(data);
      toast.success('Profile updated! ✅');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">Your Profile</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Set up your content creator brand</p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleSave}>
          {/* Name */}
          <div className="mb-5">
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1.5 block">Full Name</label>
            <input className="input-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          {/* Brand */}
          <div className="mb-5">
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1.5 block">Brand Name</label>
            <input className="input-dark" placeholder="e.g. DevOps with John" value={form.brand_name} onChange={(e) => setForm({ ...form, brand_name: e.target.value })} />
          </div>

          {/* Skill Level */}
          <div className="mb-5">
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-2 block">Skill Level</label>
            <div className="flex gap-3">
              {SKILL_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm({ ...form, skill_level: level })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border cursor-pointer transition-all ${
                    form.skill_level === level
                      ? 'bg-[var(--accent-cyan)] text-[#0a0e1a] border-[var(--accent-cyan)]'
                      : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="mb-8">
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-2 block">Platforms You Post On</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-all ${
                    form.platforms.includes(p)
                      ? 'bg-[rgba(139,92,246,0.2)] text-[var(--accent-purple)] border-[var(--accent-purple)]'
                      : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-purple)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-glow w-full flex items-center justify-center gap-2">
            {saving ? <div className="w-5 h-5 border-2 border-[#0a0e1a] border-t-transparent rounded-full animate-spin" /> : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
