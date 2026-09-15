import { useState, useEffect, useRef, type ReactNode } from 'react';
import { HomeIcon, SearchIcon, CompassIcon, BookmarkIcon } from './Icons';

interface BottomNavProps {
  active: 'home' | 'search' | 'explore' | 'saved';
  onHome: () => void;
  onSearch: () => void;
  onExplore: () => void;
  onSaved: () => void;
}

const LIQUID = 'cubic-bezier(0.25, 1.55, 0.5, 1)';

export default function BottomNav({ active, onHome, onSearch, onExplore, onSaved }: BottomNavProps) {
  const tabs: { id: 'home' | 'search' | 'explore' | 'saved'; label: string; icon: (a: boolean) => ReactNode; onClick: () => void }[] = [
    { id: 'home',    label: 'Home',    icon: (a) => <HomeIcon     size={22} filled={a} />, onClick: onHome    },
    { id: 'search',  label: 'Search',  icon: (a) => <SearchIcon   size={22} filled={a} />, onClick: onSearch  },
    { id: 'explore', label: 'Explore', icon: (a) => <CompassIcon  size={22} filled={a} />, onClick: onExplore },
    { id: 'saved',   label: 'Saved',   icon: (a) => <BookmarkIcon size={22} filled={a} />, onClick: onSaved   },
  ];

  const n = tabs.length;
  const ai = tabs.findIndex(t => t.id === active);
  const prevAi = useRef(ai);

  const BASE_W = 64;
  const STRETCH_W = 80;
  const [bw, setBw] = useState(BASE_W);

  useEffect(() => {
    if (prevAi.current === ai) return;
    prevAi.current = ai;
    setBw(STRETCH_W);
    const t = setTimeout(() => setBw(BASE_W), 220);
    return () => clearTimeout(t);
  }, [ai]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{
        zIndex: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: `calc(16px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {/* ── Liquid glass pill — dark-tinted so icons always read ── */}
      <div
        className="relative rounded-full pointer-events-auto"
        style={{
          // Dark purple-tinted glass: guarantees white icon contrast on any background
          background: 'rgba(14, 10, 36, 0.58)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.22)',     // top specular edge
            'inset 0 -1px 0 rgba(255,255,255,0.06)',    // bottom inner
            '0 20px 56px rgba(14,10,36,0.40)',          // deep lift shadow
            '0 6px 18px rgba(0,0,0,0.22)',
            '0 1px 3px rgba(0,0,0,0.14)',
          ].join(', '),
        }}
      >
        {/* Glass surface highlight — top half shimmer */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '48%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: '999px 999px 0 0',
            pointerEvents: 'none',
          }}
        />

        {/* ── Liquid bubble — stretches on transition, springs to target ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 7,
            height: 46,
            width: bw,
            borderRadius: 999,
            left: `calc(${ai} * (100% / ${n}) + (100% / ${n} - ${bw}px) / 2)`,
            transition: [
              `left 420ms ${LIQUID}`,
              `width 260ms cubic-bezier(0.34, 1.4, 0.64, 1)`,
            ].join(', '),
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.32)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.55)',
              'inset 0 -1px 0 rgba(0,0,0,0.08)',
              '0 4px 14px rgba(0,0,0,0.18)',
            ].join(', '),
            pointerEvents: 'none',
          }}
        >
          {/* Bubble inner highlight */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0, borderRadius: 999,
              background: 'linear-gradient(150deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 50%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── Tabs ── */}
        <div className="relative flex" style={{ zIndex: 10 }}>
          {tabs.map(({ id, label, icon, onClick }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={onClick}
                className="flex-1 flex flex-col items-center active:scale-[0.88] transition-transform"
                style={{
                  paddingTop: 13,
                  paddingBottom: 13,
                  gap: 4,
                  transitionDuration: '0.10s',
                }}
              >
                <div
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                    transition: 'color 220ms ease',
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(255,255,255,0.55))' : 'none',
                    lineHeight: 0,
                  }}
                >
                  {icon(isActive)}
                </div>
                <span
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: 10,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.42)',
                    transition: 'color 220ms ease',
                    lineHeight: 1,
                    letterSpacing: '0.01em',
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
