import { useState } from 'react';
import { XIcon } from './Icons';

interface NoteModalProps {
  existingNote: string;
  onSave: (text: string) => void;
  onClose: () => void;
}

export default function NoteModal({ existingNote, onSave, onClose }: NoteModalProps) {
  const [text, setText] = useState(existingNote);

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <div
        className="relative bg-white rounded-t-3xl px-5 pt-5 pb-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideUp 0.25s cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[#1D2433]">My note</h3>
            <p className="text-xs text-[#6B7A99] mt-0.5">Private — only visible to you</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <XIcon size={15} className="text-gray-500" />
          </button>
        </div>

        <textarea
          autoFocus
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a question, thought, or reflection…"
          className="w-full h-32 resize-none rounded-2xl bg-[#F8FBFF] border border-[#E2EBF8] px-4 py-3 text-sm text-[#1D2433] placeholder-[#9CA3AF] outline-none focus:border-[#0E6DFD] transition-colors"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        />

        <p className="text-[10px] text-[#6B7A99] mt-1.5 mb-4">
          Example: "My question: Why can't all countries launch rockets?"
        </p>

        <div className="flex gap-3">
          {existingNote && (
            <button
              onClick={() => onSave('')}
              className="px-4 py-3 rounded-2xl border border-red-100 text-red-500 text-sm font-medium"
            >
              Remove
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-[#E2EBF8] text-sm font-medium text-[#6B7A99]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(text)}
            className="flex-1 py-3 rounded-2xl bg-[#0E6DFD] text-sm font-semibold text-white"
          >
            Save note
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
