import { HomeIcon, CompassIcon, BookmarkIcon } from './Icons';

interface BottomNavProps {
  active: 'home' | 'explore' | 'saved';
  onHome: () => void;
  onExplore: () => void;
  onSaved: () => void;
}

export default function BottomNav({ active, onHome, onExplore, onSaved }: BottomNavProps) {
  const tabs = [
    { id: 'home'    as const, label: 'Home',    Icon: HomeIcon,     onClick: onHome },
    { id: 'explore' as const, label: 'Explore',  Icon: CompassIcon,  onClick: onExplore },
    { id: 'saved'   as const, label: 'Saved',    Icon: BookmarkIcon, onClick: onSaved },
  ];

  const activeIndex = tabs.findIndex(t => t.id === active);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-[5px] pb-4 pt-0 pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <nav
        className="relative flex items-stretch rounded-full px-2"
        style={{
          pointerEvents: 'auto',
          background: 'rgba(16, 14, 28, 0.52)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow:
            '0 8px 32px rgba(8,6,18,0.40), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.15)',
        }}
      >
        {/* Sliding glass pill — left-positioned so it aligns with padded buttons */}
        <div
          aria-hidden
          className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none"
          style={{
            width: `calc((100% - 16px) / ${tabs.length})`,
            left: `calc(8px + ${activeIndex} * (100% - 16px) / ${tabs.length})`,
            transition: 'left 0.42s cubic-bezier(0.34, 1.48, 0.64, 1)',
            background: 'rgba(255,255,255,0.13)',
            backdropFilter: 'blur(10px) brightness(1.3)',
            WebkitBackdropFilter: 'blur(10px) brightness(1.3)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.12)',
          }}
        />

        {tabs.map(({ id, label, Icon, onClick }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={onClick}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative z-10 active:scale-95 transition-transform"
              style={{
                paddingTop: 14,
                paddingBottom: `calc(14px + env(safe-area-inset-bottom, 0px))`,
                transitionDuration: '0.15s',
              }}
            >
              <div
                className="transition-all duration-300"
                style={{ filter: isActive ? 'drop-shadow(0 0 6px rgba(255,255,255,0.45))' : 'none' }}
              >
                <Icon
                  size={21}
                  className={isActive ? 'text-white' : 'text-white/35'}
                />
              </div>
              <span
                className="text-[10px] font-bold tracking-wide"
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.30)',
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
