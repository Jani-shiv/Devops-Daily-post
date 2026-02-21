import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import ProgressBar from '../components/ProgressBar';
import { HiOutlineAcademicCap, HiOutlineTrendingUp } from 'react-icons/hi';

const CATEGORY_ICONS = {
  Linux: '🐧',
  'Git & GitHub': '🔀',
  Docker: '🐳',
  Kubernetes: '☸️',
  'CI/CD': '🔄',
  'Cloud (AWS/GCP/Azure)': '☁️',
  'Monitoring & Logging': '📊',
  'Interview Prep': '🎯',
};

const CATEGORY_COLORS = {
  Linux: '#f59e0b',
  'Git & GitHub': '#ef4444',
  Docker: '#3b82f6',
  Kubernetes: '#8b5cf6',
  'CI/CD': '#06d6a0',
  'Cloud (AWS/GCP/Azure)': '#ec4899',
  'Monitoring & Logging': '#14b8a6',
  'Interview Prep': '#f97316',
};

export default function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data } = await api.get('/progress');
      setData(data);
    } catch {
      toast.error('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">Learning Progression</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Track your DevOps mastery across all categories</p>
      </div>

      {/* Overall Progress */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))' }}>
            <HiOutlineTrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">DevOps Roadmap Completion</h2>
            <p className="text-xs text-[var(--text-muted)]">{data?.overall?.completed || 0} of {data?.overall?.total || 0} topics covered</p>
          </div>
        </div>

        {/* Big circular progress */}
        <div className="flex items-center justify-center py-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-secondary)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(data?.overall?.percent || 0) * 3.267} 326.7`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-cyan)" />
                  <stop offset="100%" stopColor="var(--accent-purple)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold gradient-text">{data?.overall?.percent || 0}%</span>
              <span className="text-xs text-[var(--text-muted)]">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(data?.categories || []).map((cat) => (
          <div key={cat.category} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{CATEGORY_ICONS[cat.category] || '📦'}</span>
              <div>
                <h3 className="font-semibold text-sm">{cat.category}</h3>
                <p className="text-xs text-[var(--text-muted)]">{cat.completed} of {cat.total} topics posted</p>
              </div>
            </div>
            <ProgressBar
              label=""
              completed={cat.completed}
              total={cat.total}
              color={CATEGORY_COLORS[cat.category] || 'var(--accent-cyan)'}
            />
          </div>
        ))}
      </div>

      {/* Skill Level Guide */}
      <div className="glass-card p-6 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineAcademicCap size={20} className="text-[var(--accent-purple)]" />
          <h2 className="font-semibold">Skill Level Guide</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkillCard level="Beginner" range="0–30%" desc="Linux basics, Git fundamentals, Docker intro" color="var(--accent-orange)" />
          <SkillCard level="Intermediate" range="30–70%" desc="K8s, CI/CD pipelines, cloud services, monitoring" color="var(--accent-blue)" />
          <SkillCard level="Advanced" range="70–100%" desc="Security, multi-cloud, GitOps, system design" color="var(--accent-cyan)" />
        </div>
      </div>
    </div>
  );
}

function SkillCard({ level, range, desc, color }) {
  return (
    <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-sm font-semibold" style={{ color }}>{level}</span>
      </div>
      <p className="text-xs text-[var(--text-muted)] mb-0.5">{range}</p>
      <p className="text-xs text-[var(--text-secondary)]">{desc}</p>
    </div>
  );
}
