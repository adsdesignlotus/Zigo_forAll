import { useState } from 'react';
import { XIcon, ChevronRightIcon } from './Icons';
import type { DictionaryEntry } from '../types';

interface DictionarySheetProps {
  entry: DictionaryEntry;
  onClose: () => void;
}

export default function DictionarySheet({ entry, onClose }: DictionarySheetProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={onClose}>
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />
      <div
        className="relative bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideUp 0.25s cubic-bezier(0.32,0.72,0,1)' }}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#6B7A99] uppercase mb-1">
              Word
            </p>
            <h2 className="text-2xl font-display text-[#1D2433]">{entry.word}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <XIcon size={15} className="text-gray-500" />
          </button>
        </div>

        <div className="bg-[#F8FBFF] rounded-2xl p-4 mb-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[#0E6DFD] uppercase mb-1.5">
            What it means
          </p>
          <p className="text-[15px] leading-relaxed text-[#1D2433]">{entry.meaning}</p>
        </div>

        {entry.example && (
          <div className="mb-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6B7A99] uppercase mb-1.5">
              Example
            </p>
            <p className="text-[14px] leading-relaxed text-[#1D2433] italic">
              "{entry.example}"
            </p>
          </div>
        )}

        {entry.moreContext && (
          <>
            <button
              onClick={() => setShowMore(p => !p)}
              className="flex items-center gap-1 text-[#0E6DFD] text-sm font-medium mt-2"
            >
              More context
              <ChevronRightIcon size={14} className={`transition-transform ${showMore ? 'rotate-90' : ''}`} />
            </button>
            {showMore && (
              <p className="mt-2 text-[13px] leading-relaxed text-[#6B7A99]">{entry.moreContext}</p>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
