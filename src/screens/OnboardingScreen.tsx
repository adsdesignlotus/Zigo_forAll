import { useEffect, useState } from 'react';
import { ZigiMascot } from '../components/Mascot';
import zigoLogo from '@/imports/pasted_text/logo-1.svg';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [visible, setVisible] = useState(false);

  // Fade-in on mount, then auto-advance after 2.8 s
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 60);
    const navTimer  = setTimeout(onComplete, 2800);
    return () => { clearTimeout(showTimer); clearTimeout(navTimer); };
  }, [onComplete]);

  return (
    <div
      className="flex flex-col h-full items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #4B28D4 0%, #6B48FF 45%, #9B7FFF 100%)',
        cursor: 'pointer',
      }}
      onClick={onComplete}
    >
      {/* Ambient orbs */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: '#A97FFE', top: '-60px', right: '-60px' }}
      />
      <div
        className="absolute w-56 h-56 rounded-full opacity-20 blur-3xl"
        style={{ background: '#0E6DFD', bottom: '80px', left: '-40px' }}
      />

      {/* Logo + mascot */}
      <div
        className="flex flex-col items-center gap-6 relative z-10 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(18px)',
        }}
      >
        <ZigiMascot size={110} mood="wave" />

        <img
          src={zigoLogo}
          alt="Zigo"
          className="w-44 object-contain"
        />
      </div>

      {/* Tap to start hint */}
      <div
        className="absolute bottom-14 z-10 transition-all duration-700"
        style={{
          opacity: visible ? 0.6 : 0,
          transitionDelay: '0.5s',
        }}
      >
        <p
          className="text-white/70 text-[13px] font-semibold tracking-widest uppercase"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Tap anywhere to start
        </p>
      </div>

      {/* Auto-progress underline */}
      <div
        className="absolute bottom-10 h-[2px] rounded-full z-10"
        style={{
          background: 'rgba(255,255,255,0.25)',
          left: '40%',
          right: '40%',
          overflow: 'hidden',
        }}
      >
        <div
          className="h-full rounded-full bg-white"
          style={{
            animation: visible ? 'splashProgress 2.2s linear 0.6s forwards' : 'none',
            width: '0%',
          }}
        />
      </div>

      <style>{`
        @keyframes splashProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
