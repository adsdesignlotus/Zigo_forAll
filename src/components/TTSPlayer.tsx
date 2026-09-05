import { useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, XIcon } from './Icons';
import type { Article } from '../types';

interface TTSPlayerProps {
  article: Article;
  isPlaying: boolean;
  speed: number;
  currentParagraph: number;
  onSetPlaying: (p: boolean) => void;
  onSetSpeed: (s: number) => void;
  onSetParagraph: (p: number) => void;
  onClose: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5];

export default function TTSPlayer({
  article,
  isPlaying,
  speed,
  currentParagraph,
  onSetPlaying,
  onSetSpeed,
  onSetParagraph,
  onClose,
}: TTSPlayerProps) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const paragraphs = article.content;

  const speakParagraph = (index: number, spd: number) => {
    window.speechSynthesis.cancel();
    if (index >= paragraphs.length) {
      onSetPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(paragraphs[index]);
    u.rate = spd;
    u.onend = () => {
      const next = index + 1;
      if (next < paragraphs.length) {
        onSetParagraph(next);
        speakParagraph(next, spd);
      } else {
        onSetPlaying(false);
      }
    };
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (isPlaying) {
      speakParagraph(currentParagraph, speed);
    } else {
      window.speechSynthesis.cancel();
    }
    return () => { window.speechSynthesis.cancel(); };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      onSetPlaying(false);
    } else {
      onSetPlaying(true);
      speakParagraph(currentParagraph, speed);
    }
  };

  const handleSkipBack = () => {
    const prev = Math.max(0, currentParagraph - 1);
    onSetParagraph(prev);
    if (isPlaying) speakParagraph(prev, speed);
  };

  const handleSkipForward = () => {
    const next = Math.min(paragraphs.length - 1, currentParagraph + 1);
    onSetParagraph(next);
    if (isPlaying) speakParagraph(next, speed);
  };

  const handleSpeedChange = (s: number) => {
    onSetSpeed(s);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      speakParagraph(currentParagraph, s);
    }
  };

  const progress = paragraphs.length > 0 ? (currentParagraph / paragraphs.length) * 100 : 0;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl border-t border-[#E2EBF8] px-5 pt-4 pb-6"
      style={{ animation: 'slideUp 0.25s cubic-bezier(0.32,0.72,0,1)' }}
    >
      <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.12em] text-[#6B7A99] uppercase">
            Now reading
          </p>
          <p className="text-xs font-medium text-[#1D2433] mt-0.5 line-clamp-1">
            {article.headline}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <XIcon size={15} className="text-gray-500" />
        </button>
      </div>

      {/* Current paragraph preview */}
      <div className="bg-[#EBF2FF] rounded-xl px-3 py-2 mb-4 min-h-[48px]">
        <p className="text-[12px] leading-relaxed text-[#1D2433] line-clamp-2">
          {paragraphs[currentParagraph] || ''}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-[#6B7A99] mb-1.5">
          <span>Paragraph {currentParagraph + 1}</span>
          <span>{paragraphs.length} total</span>
        </div>
        <div className="h-1.5 bg-[#E2EBF8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0E6DFD] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={handleSkipBack} className="w-10 h-10 flex items-center justify-center text-[#1D2433]">
          <SkipBackIcon size={20} />
        </button>
        <button
          onClick={handlePlayPause}
          className="w-14 h-14 rounded-full bg-[#0E6DFD] flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
        </button>
        <button onClick={handleSkipForward} className="w-10 h-10 flex items-center justify-center text-[#1D2433]">
          <SkipForwardIcon size={20} />
        </button>
      </div>

      {/* Speed selector */}
      <div className="flex items-center gap-2 justify-center">
        <span className="text-[10px] text-[#6B7A99] mr-1">Speed</span>
        {SPEEDS.map(s => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
            style={{
              background: speed === s ? '#0E6DFD' : '#F0F4F8',
              color: speed === s ? 'white' : '#6B7A99',
            }}
          >
            {s}×
          </button>
        ))}
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
