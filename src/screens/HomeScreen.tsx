import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import {
  Newspaper, Microscope, Rocket, Cpu, Globe, Map,
  Leaf, Trophy, Landmark, type LucideIcon,
} from 'lucide-react';
import { UserIcon, BookmarkIcon, ClockIcon } from '../components/Icons';
import { ZigiMascot } from '../components/Mascot';
import { articles as allArticles, categories } from '../data/mockData';
import { BRAND, getCategoryColor } from '../data/colors';
import type { Article } from '../types';
import zigoLogo from '@/imports/pasted_text/logo.svg';

interface HomeScreenProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenArticle: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Top Stories': Newspaper, 'Science': Microscope, 'Space': Rocket,
  'Technology': Cpu, 'World': Globe, 'India': Map,
  'Nature': Leaf, 'Sports': Trophy, 'Culture': Landmark,
};

// Abbreviated labels so the rail stays compact
const SHORT_LABEL: Record<string, string> = {
  'Top Stories': 'Top', 'Technology': 'Tech',
};
function tabLabel(name: string) { return SHORT_LABEL[name] ?? name; }

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function FeaturedCard({ article, onOpen, isBookmarked, onToggleBookmark, delay }: {
  article: Article; onOpen: () => void; isBookmarked: boolean; onToggleBookmark: () => void; delay: number;
}) {
  const badgeColor = getCategoryColor(article.category);
  return (
    <div
      className="mx-4 rounded-3xl overflow-hidden relative cursor-pointer active:scale-[0.97] transition-transform card-reveal"
      onClick={onOpen}
      style={{
        height: 240,
        backgroundColor: '#DDD5F4',
        boxShadow: '0 12px 36px rgba(14,109,253,0.20)',
        animationDelay: `${delay}ms`,
      }}
    >
      <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
        <span
          className="text-[11px] font-black tracking-[0.08em] uppercase px-3 py-1.5 rounded-full shadow-md"
          style={{ background: badgeColor, color: 'white' }}
        >
          {article.category}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onToggleBookmark(); }}
          className="w-9 h-9 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center"
        >
          <BookmarkIcon size={16} filled={isBookmarked} className="text-white" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2
          className="text-white text-[18px] font-black leading-snug mb-2.5"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          {article.headline}
        </h2>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
          <ClockIcon size={11} />
          {article.reading_time} min read
        </span>
      </div>
    </div>
  );
}

function SmallCard({ article, onOpen, isBookmarked, onToggleBookmark, delay }: {
  article: Article; onOpen: () => void; isBookmarked: boolean; onToggleBookmark: () => void; delay: number;
}) {
  const badgeColor = getCategoryColor(article.category);
  return (
    <div
      className="mx-4 bg-white rounded-3xl p-4 cursor-pointer active:scale-[0.97] transition-transform card-reveal"
      onClick={onOpen}
      style={{ boxShadow: '0 4px 18px rgba(28,25,38,0.08)', animationDelay: `${delay}ms` }}
    >
      <div className="flex gap-3 items-center">
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <span
            className="self-start text-[9px] font-black tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${badgeColor}18`, color: badgeColor }}
          >
            {article.category}
          </span>
          <p
            className="text-[14px] font-black leading-snug text-[#0F172A] line-clamp-2"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {article.headline}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#94A3B8]">
            <ClockIcon size={10} />
            <span>{article.reading_time} min · {formatDate(article.published_at)}</span>
          </div>
        </div>
        <div className="flex-none w-[76px] h-[84px] rounded-2xl overflow-hidden" style={{ background: '#DDD5F4' }}>
          <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

// Spring easing shared across all pill transitions
const SPRING = 'cubic-bezier(0.34, 1.06, 0.64, 1)';
const PILL_DURATION = '270ms';

export default function HomeScreen({
  activeCategory, onCategoryChange, onOpenArticle, isBookmarked, onToggleBookmark,
}: HomeScreenProps) {
  // ── Tab rail: gliding pill ──
  const railRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 72 });
  const [pillReady, setPillReady] = useState(false);

  // ── Feed direction + animation ──
  const prevCatRef = useRef(activeCategory);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [feedKey, setFeedKey] = useState(activeCategory);

  // ── Per-tab tap counter for icon press replay ──
  const [tapCounts, setTapCounts] = useState<number[]>(() => categories.map(() => 0));

  // ── Swipe tracking ──
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const swiping = useRef(false);

  // Measure the pill position for a given category name
  const measurePill = (catName: string) => {
    const idx = categories.findIndex(c => c.name === catName);
    const btn = btnRefs.current[idx];
    if (!btn) return;
    setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
  };

  // Initial measurement — synchronous before first paint
  useLayoutEffect(() => {
    measurePill(activeCategory);
    setPillReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track category changes for direction + animation
  useEffect(() => {
    if (prevCatRef.current === activeCategory) return;
    const prevIdx = categories.findIndex(c => c.name === prevCatRef.current);
    const nextIdx = categories.findIndex(c => c.name === activeCategory);
    setDirection(nextIdx >= prevIdx ? 1 : -1);
    setFeedKey(activeCategory);
    prevCatRef.current = activeCategory;
    // Measure on the next frame after React has committed the new render
    requestAnimationFrame(() => measurePill(activeCategory));
  }, [activeCategory]);

  // Handle tab click: update tap counter (forces icon press animation replay) + navigate
  const handleTabClick = (catName: string, idx: number) => {
    setTapCounts(prev => {
      const next = [...prev];
      next[idx]++;
      return next;
    });
    onCategoryChange(catName);
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    swiping.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!swiping.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    // Content follows finger at 28% — feels tethered, not loose
    setSwipeOffset(delta * 0.28);
  };
  const onTouchEnd = () => {
    swiping.current = false;
    const delta = touchDeltaX.current;
    touchDeltaX.current = 0;
    setSwipeOffset(0); // always snap back (transition handles smoothness)

    if (Math.abs(delta) > 55) {
      const curIdx = categories.findIndex(c => c.name === activeCategory);
      const nextIdx = curIdx + (delta < 0 ? 1 : -1);
      if (nextIdx >= 0 && nextIdx < categories.length) {
        onCategoryChange(categories[nextIdx].name);
      }
    }
  };

  const filteredArticles = activeCategory === 'Top Stories'
    ? allArticles
    : allArticles.filter(a => a.category === activeCategory);
  const featured = filteredArticles.find(a => a.featured) ?? filteredArticles[0];
  const rest = filteredArticles.filter(a => a !== featured);

  return (
    <div className="flex flex-col h-full" style={{ background: '#EDE8F8' }}>

      {/* ── Header — locked, never animates ── */}
      <div className="flex-none pt-12 px-4 pb-0" style={{ background: '#EDE8F8' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-0.5">
            <img src={zigoLogo} alt="Zigo" className="h-8 object-contain object-left" />
            <p className="text-[10px] font-bold leading-none" style={{ color: '#8B7CB6' }}>
              {getGreeting()}, Explorer! 👋
            </p>
          </div>
          <button
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: '#DDD5F4', boxShadow: '0 2px 8px rgba(14,10,36,0.10)' }}
          >
            <UserIcon size={19} className="text-[#6B4DC4]" />
          </button>
        </div>

        {/* ── Single continuous tab rail with gliding pill ── */}
        <div
          ref={railRef}
          className="relative flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-3 pt-1"
        >
          {/* The one gliding pill — positioned absolutely, slides between tabs */}
          {pillReady && (
            <div
              aria-hidden
              className="absolute top-1 bottom-3 rounded-2xl pointer-events-none"
              style={{
                left: pill.left,
                width: pill.width,
                background: 'white',
                boxShadow: '0 2px 12px rgba(14,109,253,0.18), 0 1px 3px rgba(0,0,0,0.07)',
                transition: `left ${PILL_DURATION} ${SPRING}, width ${PILL_DURATION} ${SPRING}`,
                zIndex: 0,
              }}
            />
          )}

          {/* Tab buttons */}
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.name;
            const Icon = CATEGORY_ICONS[cat.name] ?? Newspaper;
            return (
              <button
                key={cat.id}
                ref={el => { btnRefs.current[idx] = el; }}
                onClick={() => handleTabClick(cat.name, idx)}
                className="relative flex-none flex flex-col items-center justify-center gap-0.5 px-3.5 py-2.5 z-10"
                style={{ minWidth: 60 }}
              >
                {/* Icon — key changes on each tap to replay press animation */}
                <div
                  key={tapCounts[idx]}
                  className={tapCounts[idx] > 0 ? 'icon-pressed' : ''}
                  style={{
                    color: isActive ? BRAND.blue : '#94A3B8',
                    transition: `color 0.22s ease`,
                  }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Label — always in layout, color-fades */}
                <span
                  className="text-[10px] whitespace-nowrap leading-none"
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0F172A' : '#94A3B8',
                    transition: 'color 0.22s ease',
                  }}
                >
                  {tabLabel(cat.name)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Feed — directional crossfade, swipe-tethered ── */}
      <div
        key={feedKey}
        className={`flex-1 overflow-y-auto scrollbar-hide pb-28 ${direction > 0 ? 'feed-right' : 'feed-left'}`}
        style={{
          transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined,
          transition: swipeOffset === 0 ? `transform 0.26s ${SPRING}` : 'none',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-8 text-center">
            <ZigiMascot size={80} mood="sad" />
            <p className="font-black text-[#0F172A] text-lg mt-3 mb-1">Nothing here yet</p>
            <p className="text-sm font-medium text-[#94A3B8]">More stories coming soon.</p>
          </div>
        ) : (
          <>
            <div className="px-4 pb-2.5">
              <p className="text-[13px] font-black" style={{ color: BRAND.blue }}>
                {activeCategory === 'Top Stories' ? '✨ Featured story' : `Top in ${activeCategory}`}
              </p>
            </div>

            {/* Featured card — animates first */}
            {featured && (
              <FeaturedCard
                article={featured}
                onOpen={() => onOpenArticle(featured.id)}
                isBookmarked={isBookmarked(featured.id)}
                onToggleBookmark={() => onToggleBookmark(featured.id)}
                delay={0}
              />
            )}

            {/* Remaining cards — staggered 25ms apart */}
            {rest.length > 0 && (
              <div className="mt-4">
                <p className="px-4 text-[13px] font-black text-[#0F172A] mb-3">More stories</p>
                <div className="flex flex-col gap-3">
                  {rest.map((article, i) => (
                    <SmallCard
                      key={article.id}
                      article={article}
                      onOpen={() => onOpenArticle(article.id)}
                      isBookmarked={isBookmarked(article.id)}
                      onToggleBookmark={() => onToggleBookmark(article.id)}
                      delay={25 + i * 25}
                    />
                  ))}
                </div>
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}
