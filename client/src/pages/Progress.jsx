import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProgressBar from '../components/ProgressBar';

export default function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/progress').then(({ data }) => setData(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: 'var(--gray)' }}>Loading progress...</p>
      </div>
    );
  }

  const overall = data?.overall || { completed: 0, total: 64 };
  const categories = data?.categories || [];
  const pct = overall.total > 0 ? Math.round((overall.completed / overall.total) * 100) : 0;

  return (
    <div className="page animate-in">
      <h1 className="section-title">Progress</h1>
      <p className="section-subtitle">Track your DevOps learning journey</p>

      {/* Overall Progress Ring */}
      <div className="card" style={{ textAlign: 'center', marginBottom: 24, padding: 32 }}>
        <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 20px' }}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--black-light)" strokeWidth="10" />
            <circle
              cx="70" cy="70" r="60" fill="none"
              stroke="var(--green)" strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 377} 377`}
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--green)' }}>{pct}%</span>
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
          <span style={{ color: 'var(--white)', fontWeight: 600 }}>{overall.completed}</span> of{' '}
          <span style={{ color: 'var(--white)', fontWeight: 600 }}>{overall.total}</span> topics covered
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 24 }}>By Category</h3>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <ProgressBar
              key={cat.category}
              label={cat.category}
              value={cat.completed}
              max={cat.total}
            />
          ))
        ) : (
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-muted)', textAlign: 'center', padding: 24 }}>
            No progress yet — generate your first post to get started!
          </p>
        )}
      </div>
    </div>
  );
}
