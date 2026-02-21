import { useState, useEffect } from 'react';
import api from '../utils/api';
import CopyButton from '../components/CopyButton';

export default function DailyPost() {
  const [topic, setTopic] = useState(null);
  const [post, setPost] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(true);

  useEffect(() => {
    api.get('/topics/daily').then(({ data }) => setTopic(data)).catch(() => {}).finally(() => setLoadingTopic(false));
  }, []);

  const generatePost = async () => {
    if (!topic) return;
    setGenerating(true);
    try {
      const { data } = await api.post('/posts/generate', { topicId: topic.id });
      setPost(data);
    } catch (err) {
      alert('Failed to generate post');
    } finally {
      setGenerating(false);
    }
  };

  const fullPostText = post
    ? `${post.hook}\n\n${post.explanation}\n\n${post.codeBreakdown || ''}\n\n${post.useCase || ''}\n\n${post.cta}\n\n${post.hashtags}`
    : '';

  if (loadingTopic) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: 'var(--gray)' }}>Loading today's topic...</p>
      </div>
    );
  }

  return (
    <div className="page animate-in">
      <h1 className="section-title">Today's Post</h1>
      <p className="section-subtitle">Your daily DevOps content, ready to publish</p>

      {/* Topic Card */}
      {topic && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  background: 'var(--green-bg)', color: 'var(--green)',
                  padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600,
                }}>
                  {topic.category}
                </span>
                <span style={{
                  background: 'rgba(245,158,11,0.08)', color: 'var(--amber)',
                  padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600,
                }}>
                  {topic.difficulty}
                </span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 6 }}>{topic.title}</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray)', lineHeight: 1.5 }}>{topic.description}</p>
            </div>
          </div>

          {!post && (
            <button
              className="btn-primary"
              onClick={generatePost}
              disabled={generating}
              style={{ marginTop: 20 }}
            >
              {generating ? '⏳ Generating...' : '✨ Generate Post'}
            </button>
          )}
        </div>
      )}

      {/* Generated Post */}
      {post && (
        <div className="card animate-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Generated Post</h3>
            <CopyButton text={fullPostText} label="Copy All" />
          </div>

          {/* Hook */}
          <Section title="Hook" content={post.hook} />
          <Section title="Explanation" content={post.explanation} />
          {post.codeBreakdown && <Section title="Code Breakdown" content={post.codeBreakdown} />}
          {post.useCase && <Section title="Real-World Use Case" content={post.useCase} />}
          <Section title="Call to Action" content={post.cta} />

          {/* Hashtags */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="label" style={{ marginBottom: 0 }}>Hashtags</span>
              <CopyButton text={post.hashtags} label="Copy" />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--green)', lineHeight: 1.6 }}>{post.hashtags}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, content }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span className="label" style={{ marginBottom: 0 }}>{title}</span>
        <CopyButton text={content} label="Copy" />
      </div>
      <div style={{
        background: 'var(--black-light)', borderRadius: 'var(--radius)',
        padding: 16, fontSize: '0.88rem', lineHeight: 1.7,
        color: 'var(--white-soft)', whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </div>
  );
}
