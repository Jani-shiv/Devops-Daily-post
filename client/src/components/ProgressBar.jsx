export default function ProgressBar({ label, completed, total, color = 'var(--accent-cyan)' }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
        <span className="text-xs text-[var(--text-muted)]">
          {completed}/{total} · {percent}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${color}, var(--accent-purple))`,
          }}
        />
      </div>
    </div>
  );
}
