import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ linkedinUrl: '', bio: '', goal: 30 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/profile').then(({ data }) => {
      setProfile(data);
      setForm({
        linkedinUrl: data.linkedinUrl || '',
        bio: data.bio || '',
        goal: data.dailyGoal || 30,
      });
    }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/profile', {
        linkedinUrl: form.linkedinUrl,
        bio: form.bio,
        dailyGoal: form.goal,
      });
      setProfile(data);
      setEditing(false);
    } catch (err) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page animate-in">
      <h1 className="section-title">Profile</h1>
      <p className="section-subtitle">Manage your account settings</p>

      {/* User Info Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--green-bg)', border: '2px solid var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: 'var(--green)',
          }}>
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{user?.name}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{user?.email}</p>
          </div>
        </div>

        <div className="divider" />

        {!editing ? (
          <div>
            <div style={{ marginBottom: 16 }}>
              <span className="label">LinkedIn URL</span>
              <p style={{ fontSize: '0.9rem', color: profile?.linkedinUrl ? 'var(--green)' : 'var(--gray-muted)' }}>
                {profile?.linkedinUrl || 'Not set'}
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <span className="label">Bio</span>
              <p style={{ fontSize: '0.9rem', color: profile?.bio ? 'var(--white-soft)' : 'var(--gray-muted)' }}>
                {profile?.bio || 'No bio yet'}
              </p>
            </div>
            <div style={{ marginBottom: 24 }}>
              <span className="label">Daily Goal</span>
              <p style={{ fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--green)', fontWeight: 600 }}>{profile?.dailyGoal || 30}</span>
                <span style={{ color: 'var(--gray)' }}> days</span>
              </p>
            </div>
            <button className="btn-secondary" onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label className="label">LinkedIn URL</label>
              <input className="input" placeholder="https://linkedin.com/in/yourname" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Bio</label>
              <textarea
                className="input"
                style={{ minHeight: 80, resize: 'vertical' }}
                placeholder="Tell us about yourself..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label className="label">Daily Goal (days)</label>
              <input className="input" type="number" min="1" max="365" value={form.goal} onChange={(e) => setForm({ ...form, goal: parseInt(e.target.value) || 30 })} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-primary" onClick={save} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
