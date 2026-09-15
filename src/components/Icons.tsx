interface IconProps {
  className?: string;
  size?: number;
}

export const HomeIcon = ({ className = '', size = 24, filled = false }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {filled ? (
      <>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V13h6v8" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ) : (
      <>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    )}
  </svg>
);

export const CompassIcon = ({ className = '', size = 24, filled = false }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75"/>
    <path
      d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
      fill={filled ? 'white' : 'none'}
      stroke={filled ? 'white' : 'currentColor'}
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

export const BookmarkIcon = ({ className = '', size = 24, filled = false }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} className={className}>
    <path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SearchIcon = ({ className = '', size = 24, filled = false }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="7" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75"/>
    <path d="M20 20l-3-3" stroke={filled ? 'white' : 'currentColor'} strokeWidth="1.75" strokeLinecap="round"/>
    {filled && <path d="M14.5 7.5a4.5 4.5 0 01-4.5 6.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>}
  </svg>
);

export const UserIcon = ({ className = '', size = 24, filled = false }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle
      cx="12" cy="8" r="4"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.75"
    />
    <path
      d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
    />
  </svg>
);

export const ArrowLeftIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShareIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.75"/>
    <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.75"/>
    <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export const PlayIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 4.5l14 7.5-14 7.5V4.5z"/>
  </svg>
);

export const PauseIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="5" y="4" width="4" height="16" rx="1.5"/>
    <rect x="15" y="4" width="4" height="16" rx="1.5"/>
  </svg>
);

export const SkipBackIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 20L9 12l10-8v16z"/>
    <rect x="4" y="4" width="2.5" height="16" rx="1.25"/>
  </svg>
);

export const SkipForwardIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 4l10 8-10 8V4z"/>
    <rect x="17.5" y="4" width="2.5" height="16" rx="1.25"/>
  </svg>
);

export const XIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export const MicIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M5 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export const TypeIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="4,7 4,4 20,4 20,7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export const EditIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HighlightIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15.5 2.5L21.5 8.5L10.5 19.5L4.5 19.5L4.5 13.5L15.5 2.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <line x1="3" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <line x1="12" y1="6" x2="18" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export const ChevronRightIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ClockIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CopyIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export const TrashIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SparkleIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l1.8 5.4H19l-4.6 3.4 1.8 5.4L12 13l-4.2 3.2 1.8-5.4L5 7.4h5.2L12 2z"/>
  </svg>
);
