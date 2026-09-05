import { useState } from 'react';
import { XIcon, CopyIcon } from './Icons';
import type { Article } from '../types';

interface ShareSheetProps {
  content: { text?: string; articleId: string };
  article: Article;
  onClose: () => void;
}

export default function ShareSheet({ content, article, onClose }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  const shareText = content.text
    ? `"${content.text}"\n\n— ${article.headline}\n\nRead on Zigo: zigo.app/story/${article.id}`
    : `${article.headline}\n\n${article.summary}\n\nRead on Zigo: zigo.app/story/${article.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.headline, text: shareText });
        onClose();
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <div
        className="relative bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideUp 0.25s cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1D2433]">Share</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <XIcon size={15} className="text-gray-500" />
          </button>
        </div>

        {/* Preview card */}
        <div className="bg-[#F8FBFF] border border-[#E2EBF8] rounded-2xl overflow-hidden mb-5">
          {content.text ? (
            <div className="p-4">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-[#0E6DFD] uppercase mb-2">
                Selected text
              </p>
              <p className="text-sm text-[#1D2433] italic leading-relaxed mb-3">
                "{content.text}"
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-[#E2EBF8]">
                <img
                  src={article.image}
                  alt=""
                  className="w-8 h-8 rounded-lg object-cover bg-blue-100"
                />
                <div>
                  <p className="text-[11px] font-medium text-[#1D2433] line-clamp-1">{article.headline}</p>
                  <p className="text-[10px] text-[#6B7A99]">Zigo · {article.category}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 p-4">
              <img
                src={article.image}
                alt={article.headline}
                className="w-16 h-16 rounded-xl object-cover bg-blue-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[#0E6DFD] uppercase mb-1">
                  {article.category} · Zigo
                </p>
                <p className="text-[13px] font-medium text-[#1D2433] leading-snug line-clamp-2">
                  {article.headline}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Share options */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#E2EBF8] text-sm font-medium text-[#1D2433] transition-colors"
            style={{ background: copied ? '#EBF2FF' : 'white' }}
          >
            <CopyIcon size={16} className={copied ? 'text-[#0E6DFD]' : 'text-gray-500'} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleNativeShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0E6DFD] text-sm font-semibold text-white"
          >
            Share
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
