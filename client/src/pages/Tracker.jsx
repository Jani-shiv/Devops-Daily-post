import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Tracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tracker').then(({ data }) => setData(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: 'var(--gray)' }}>Loading tracker...</p>
      </div>
    );
  }

  const stats = data?.stats || { totalPosts: 0, streak: 0, thisMonth: 0 };
  const calendar = data?.calendar || [];

  return (
    <div className="page animate-in">
      <h1 className="section-title">Tracker</h1>
      <p className="section-subtitle">Your 30-day posting calendar and streaks</p>

      {/* Stats Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32,
      }}>
        <StatCard icon="📝" value={stats.totalPosts} label="Total Posts" />
        <StatCard icon="🔥" value={stats.streak} label="Day Streak" color="var(--amber)" />
        <StatCard icon="📅" value={stats.thisMonth} label="This Month" color="var(--green)" />
      </div>

      {/* Calendar Grid */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 20 }}>Last 30 Days</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8,
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} style={{
              textAlign: 'center', fontSize: '0.7rem', fontWeight: 500,
              color: 'var(--gray-muted)', paddingBottom: 8,
            }}>
              {d}
            </div>
          ))}
          {calendar.map((day, i) => (
            <div
              key={i}
              title={day.date}
              style={{
                aspectRatio: '1', borderRadius: 6,
                background: day.posted ? 'var(--green)' : 'var(--black-light)',
                border: `1px solid ${day.posted ? 'var(--green)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 500,
                color: day.posted ? 'var(--black)' : 'var(--gray-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              {new Date(day.date).getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color = 'var(--white)' }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: 20 }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{label}</div>
    </div>
  );
}
