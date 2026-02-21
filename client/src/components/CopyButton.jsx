import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? 'var(--green-bg)' : 'transparent',
        border: `1px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
        color: copied ? 'var(--green)' : 'var(--gray)',
        padding: '6px 14px',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: '0.78rem',
        fontWeight: 500,
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {copied ? '✓ Copied' : `📋 ${label}`}
    </button>
  );
}
