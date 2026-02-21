export default function ProgressBar({ label, value, max = 100 }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--white-soft)' }}>{label}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green)' }}>{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
