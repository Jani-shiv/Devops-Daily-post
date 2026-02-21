import { useState } from 'react';
import { HiOutlineClipboardCopy, HiCheck } from 'react-icons/hi';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-0 ${
        copied
          ? 'bg-[rgba(6,214,160,0.2)] text-[var(--accent-cyan)]'
          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[rgba(6,214,160,0.1)]'
      }`}
    >
      {copied ? <HiCheck size={14} /> : <HiOutlineClipboardCopy size={14} />}
      {copied ? 'Copied!' : label}
    </button>
  );
}
