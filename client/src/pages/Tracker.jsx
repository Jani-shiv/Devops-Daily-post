import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineFire, HiOutlineHeart, HiOutlineChatAlt, HiOutlineShare, HiOutlineTrendingUp } from 'react-icons/hi';

export default function Tracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchTracker();
  }, []);

  const fetchTracker = async () => {
    try {
      const { data } = await api.get('/tracker/calendar');
      setData(data);
    } catch {
      toast.error('Failed to load tracker');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (postId, status) => {
    try {
      await api.put(`/posts/${postId}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchTracker();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleEngagementSave = async (postId) => {
    try {
      await api.put(`/posts/${postId}`, editForm);
      toast.success('Engagement updated ✅');
      setEditingId(null);
      fetchTracker();
    } catch {
      toast.error('Failed to update');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="animate-fade-in-up">
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">30-Day Tracker</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Track your daily posting consistency</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<HiOutlineFire />} label="Current Streak" value={`${data?.streak || 0} days`} color="var(--accent-orange)" />
        <StatCard icon={<HiOutlineHeart />} label="Total Likes" value={data?.totalEngagement?.likes || 0} color="var(--accent-pink)" />
        <StatCard icon={<HiOutlineChatAlt />} label="Total Comments" value={data?.totalEngagement?.comments || 0} color="var(--accent-blue)" />
        <StatCard icon={<HiOutlineShare />} label="Total Shares" value={data?.totalEngagement?.shares || 0} color="var(--accent-purple)" />
      </div>

      {/* Calendar Grid */}
      <div className="glass-card p-6 mb-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <HiOutlineTrendingUp size={18} className="text-[var(--accent-cyan)]" />
          30-Day Calendar
        </h2>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayLabels.map((d, i) => (
            <div key={i} className="text-center text-xs text-[var(--text-muted)] font-medium">{d}</div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-2">
          {(data?.calendar || []).map((day, i) => {
            const dateObj = new Date(day.date + 'T00:00:00');
            const dayNum = dateObj.getDate();
            const isToday = day.date === new Date().toISOString().split('T')[0];

            return (
              <div
                key={i}
                className={`relative p-2 rounded-xl text-center transition-all min-h-[60px] flex flex-col items-center justify-center ${
                  isToday ? 'ring-2 ring-[var(--accent-cyan)]' : ''
                } ${
                  day.status === 'Posted'
                    ? 'bg-[rgba(6,214,160,0.15)] border border-[rgba(6,214,160,0.3)]'
                    : day.status === 'Drafted'
                    ? 'bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)]'
                    : day.status === 'Planned'
                    ? 'bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border-subtle)]'
                }`}
                title={day.topic || 'No post'}
              >
                <span className="text-xs font-bold">{dayNum}</span>
                {day.status && (
                  <span className="text-[8px] mt-0.5 font-semibold uppercase" style={{
                    color: day.status === 'Posted' ? 'var(--accent-cyan)' : day.status === 'Drafted' ? 'var(--accent-blue)' : 'var(--accent-orange)'
                  }}>
                    {day.status[0]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 justify-center">
          <Legend color="rgba(6,214,160,0.3)" label="Posted" />
          <Legend color="rgba(59,130,246,0.3)" label="Drafted" />
          <Legend color="rgba(245,158,11,0.3)" label="Planned" />
          <Legend color="var(--bg-secondary)" label="Empty" />
        </div>
      </div>

      {/* Post List */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-3">
          {(data?.calendar || [])
            .filter((d) => d.topic)
            .reverse()
            .map((day, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[var(--text-muted)]">{day.date}</span>
                    <span className={`badge ${day.status === 'Posted' ? 'badge-posted' : day.status === 'Drafted' ? 'badge-drafted' : 'badge-planned'}`}>{day.status}</span>
                  </div>
                  <p className="text-sm font-medium">{day.topic}</p>
                  <span className="text-xs text-[var(--text-muted)]">{day.category}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><HiOutlineHeart size={14} /> {day.likes}</span>
                  <span className="flex items-center gap-1"><HiOutlineChatAlt size={14} /> {day.comments}</span>
                  <span className="flex items-center gap-1"><HiOutlineShare size={14} /> {day.shares}</span>
                </div>
              </div>
            ))}

          {(data?.calendar || []).filter((d) => d.topic).length === 0 && (
            <div className="text-center py-8 text-[var(--text-muted)]">
              <p>No posts yet! Head to the <strong>Daily Post</strong> page to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="glass-card p-4 text-center">
      <div className="text-2xl mb-1" style={{ color }}>{icon}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-[var(--text-muted)] mt-0.5">{label}</div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-3 rounded" style={{ background: color, border: `1px solid ${color}` }} />
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
    </div>
  );
}
