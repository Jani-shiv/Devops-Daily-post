import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import CopyButton from '../components/CopyButton';
import { HiOutlineRefresh, HiOutlineBookOpen, HiOutlineLightningBolt, HiOutlineCode, HiOutlineGlobe, HiOutlineExclamation, HiOutlineChatAlt2, HiOutlineHashtag } from 'react-icons/hi';

export default function DailyPost() {
  const [topic, setTopic] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchDailyTopic();
  }, []);

  const fetchDailyTopic = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/topics/daily');
      setTopic(data.topic);
      setPost(data.post);
    } catch (err) {
      toast.error('Failed to fetch daily topic');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic) return;
    setGenerating(true);
    try {
      const { data } = await api.post('/posts/generate', { topic_id: topic.id });
      setPost(data.post);
      toast.success('Post generated! 🔥');
    } catch (err) {
      toast.error('Failed to generate post');
    } finally {
      setGenerating(false);
    }
  };

  const getFullPostText = () => {
    if (!post) return '';
    return [
      post.hook,
      '',
      post.explanation,
      '',
      post.technical_breakdown,
      '',
      post.use_case,
      '',
      post.common_mistakes,
      '',
      post.cta,
      '',
      (post.hashtags || []).join(' '),
    ].join('\n');
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Today's DevOps Post</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        {post && (
          <CopyButton text={getFullPostText()} label="Copy Entire Post" />
        )}
      </div>

      {/* Topic Card */}
      {topic && (
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))' }}>
                📌
              </div>
              <div>
                <h2 className="text-xl font-bold">{topic.title}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.15)] text-[var(--accent-purple)] border border-[rgba(139,92,246,0.3)]">{topic.category}</span>
                  <span className={`badge ${topic.difficulty === 'Beginner' ? 'badge-planned' : topic.difficulty === 'Intermediate' ? 'badge-drafted' : 'badge-posted'}`}>
                    {topic.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {topic.description && <p className="text-sm text-[var(--text-secondary)]">{topic.description}</p>}

          {!post && (
            <button onClick={handleGenerate} disabled={generating} className="btn-glow mt-5 flex items-center gap-2">
              {generating ? (
                <div className="w-5 h-5 border-2 border-[#0a0e1a] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineLightningBolt size={18} />
                  Generate Post
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Generated Post Sections */}
      {post && (
        <div className="space-y-4">
          <PostSection icon={<HiOutlineLightningBolt />} title="Scroll-Stopping Hook" content={post.hook} accent="var(--accent-orange)" />
          <PostSection icon={<HiOutlineBookOpen />} title="Simple Explanation" content={post.explanation} accent="var(--accent-blue)" />
          <PostSection icon={<HiOutlineCode />} title="Technical Breakdown" content={post.technical_breakdown} accent="var(--accent-purple)" />
          <PostSection icon={<HiOutlineGlobe />} title="Real-World Use Case" content={post.use_case} accent="var(--accent-cyan)" />
          <PostSection icon={<HiOutlineExclamation />} title="Common Mistakes" content={post.common_mistakes} accent="var(--accent-red)" />
          <PostSection icon={<HiOutlineChatAlt2 />} title="Call to Action" content={post.cta} accent="var(--accent-pink)" />

          {/* Hashtags */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HiOutlineHashtag size={18} style={{ color: 'var(--accent-cyan)' }} />
                <h3 className="font-semibold text-sm">Hashtags</h3>
              </div>
              <CopyButton text={(post.hashtags || []).join(' ')} label="Copy" />
            </div>
            <div className="flex flex-wrap gap-2">
              {(post.hashtags || []).map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-[rgba(6,214,160,0.1)] text-[var(--accent-cyan)] border border-[rgba(6,214,160,0.2)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Regenerate */}
          <div className="flex justify-center pt-4">
            <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-all cursor-pointer">
              <HiOutlineRefresh size={16} className={generating ? 'animate-spin' : ''} />
              Regenerate Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PostSection({ icon, title, content, accent }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ color: accent }}>{icon}</span>
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <CopyButton text={content} label="Copy" />
      </div>
      <div className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{content}</div>
    </div>
  );
}
