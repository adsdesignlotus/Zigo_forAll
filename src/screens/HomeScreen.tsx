import { useRef } from 'react';
import {
  Newspaper, Microscope, Rocket, Cpu, Globe, Map,
  Leaf, Trophy, Landmark, type LucideIcon,
} from 'lucide-react';
import { SearchIcon, BookmarkIcon, ClockIcon } from '../components/Icons';
import { ZigiMascot } from '../components/Mascot';
import { articles as allArticles, categories } from '../data/mockData';
import { BRAND, getCategoryColor } from '../data/colors';
import type { Article } from '../types';
import zigoLogo from '@/imports/pasted_text/logo.svg';

interface HomeScreenProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenArticle: (id: string) => void;
  onSearch: () => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Top Stories': Newspaper, 'Science': Microscope, 'Space': Rocket,
  'Technology': Cpu, 'World': Globe, 'India': Map,
  'Nature': Leaf, 'Sports': Trophy, 'Culture': Landmark,
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function FeaturedCard({ article, onOpen, isBookmarked, onToggleBookmark }: {
  article: Article; onOpen: () => void; isBookmarked: boolean; onToggleBookmark: () => void;
}) {
  const badgeColor = getCategoryColor(article.category);
  return (
    <div
      className="mx-4 rounded-3xl overflow-hidden relative cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onOpen}
      style={{ height: 240, backgroundColor: '#DDD5F4', boxShadow: `0 12px 36px rgba(14,109,253,0.20)` }}
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
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
            <ClockIcon size={11} />
            {article.reading_time} min read
          </span>
          <span
            className="px-3 py-1 rounded-full text-[11px] font-black text-white"
            style={{ background: BRAND.orange }}
          >
            Read now →
          </span>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ article, onOpen, isBookmarked, onToggleBookmark }: {
  article: Article; onOpen: () => void; isBookmarked: boolean; onToggleBookmark: () => void;
}) {
  const badgeColor = getCategoryColor(article.category);
  return (
    <div
      className="mx-4 bg-white rounded-3xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onOpen}
      style={{ boxShadow: '0 4px 18px rgba(28,25,38,0.08)' }}
    >
      <div className="flex gap-3">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <span
              className="text-[9px] font-black tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: `${badgeColor}18`, color: badgeColor }}
            >
              {article.category}
            </span>
            <button onClick={e => { e.stopPropagation(); onToggleBookmark(); }} className="flex-none">
              <BookmarkIcon size={15} filled={isBookmarked} className={isBookmarked ? 'text-[#0E6DFD]' : 'text-gray-300'} />
            </button>
          </div>
          <p
            className="text-[14px] font-black leading-snug text-[#0F172A] line-clamp-2 flex-1"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {article.headline}
          </p>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#94A3B8]">
              <ClockIcon size={10} />
              <span>{article.reading_time} min · {formatDate(article.published_at)}</span>
            </div>
            <span
              className="px-3 py-1 rounded-full text-[10px] font-black text-white"
              style={{ background: BRAND.orange }}
            >
              Read →
            </span>
          </div>
        </div>
        <div className="flex-none w-[80px] h-[88px] rounded-2xl overflow-hidden" style={{ background: '#DDD5F4' }}>
          <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function HomeScreen({
  activeCategory, onCategoryChange, onOpenArticle, onSearch, isBookmarked, onToggleBookmark,
}: HomeScreenProps) {
  const catRef = useRef<HTMLDivElement>(null);

  const filteredArticles = activeCategory === 'Top Stories'
    ? allArticles
    : allArticles.filter(a => a.category === activeCategory);

  const featured = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const rest = filteredArticles.filter(a => a !== featured);

  return (
    <div className="flex flex-col h-full" style={{ background: '#EDE8F8' }}>
      {/* ── Header ── */}
      <div className="flex-none pt-12 px-4 pb-1" style={{ background: '#EDE8F8' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-0.5">
            <img src={zigoLogo} alt="Zigo" className="h-8 object-contain object-left" />
            <p className="text-[10px] font-bold leading-none" style={{ color: '#8B7CB6' }}>
              {getGreeting()}, Explorer! 👋
            </p>
          </div>
          <button
            onClick={onSearch}
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: BRAND.blue, boxShadow: `0 4px 14px ${BRAND.blue}50` }}
          >
            <SearchIcon size={18} className="text-white" />
          </button>
        </div>

        {/* ── Category circular icon shortcuts — active = Zigo Blue always ── */}
        <div
          ref={catRef}
          className="flex gap-3.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4 pt-1"
        >
          {categories.map(cat => {
            const isActive = activeCategory === cat.name;
            const Icon = CATEGORY_ICONS[cat.name] || Newspaper;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.name)}
                className="flex-none flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div
                  className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center"
                  style={{
                    background: isActive ? BRAND.blue : 'white',
                    boxShadow: isActive
                      ? `0 6px 18px ${BRAND.blue}50`
                      : '0 2px 10px rgba(28,25,38,0.09)',
                  }}
                >
                  <Icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    color={isActive ? 'white' : '#94A3B8'}
                  />
                </div>
                <span
                  className="text-[10px] leading-none whitespace-nowrap"
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#0F172A' : '#94A3B8',
                  }}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-8 text-center">
            <ZigiMascot size={80} mood="sad" />
            <p className="font-black text-[#0F172A] text-lg mt-3 mb-1">Nothing here yet</p>
            <p className="text-sm font-medium text-[#94A3B8]">More stories in this category are coming soon.</p>
          </div>
        ) : (
          <>
            {/* Zigi hero banner — home feed only */}
            {activeCategory === 'Top Stories' && (
              <div
                className="mx-4 mb-4 rounded-3xl flex items-center gap-2 px-5 py-4 overflow-hidden"
                style={{
                  background: 'linear-gradient(130deg, #5B35E0 0%, #8B63F5 55%, #A97FFE 100%)',
                  boxShadow: '0 10px 32px rgba(91,53,224,0.30)',
                  minHeight: 108,
                }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.16em] mb-1">Today's world</p>
                  <p
                    className="text-white font-black leading-tight"
                    style={{ fontFamily: 'Nunito, sans-serif', fontSize: 18 }}
                  >
                    {"What's happening "}
                    <span style={{ fontStyle: 'italic' }}>around us?</span>
                  </p>
                  <div
                    className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.18)' }}
                  >
                    <span className="text-white text-[11px] font-bold">{allArticles.length} stories today</span>
                  </div>
                </div>
                <ZigiMascot size={90} mood="wave" />
              </div>
            )}

            <div className="px-4 pb-2.5">
              <p className="text-[13px] font-black" style={{ color: BRAND.blue }}>
                {activeCategory === 'Top Stories' ? '✨ Featured story' : `Top in ${activeCategory}`}
              </p>
            </div>

            {featured && (
              <FeaturedCard
                article={featured}
                onOpen={() => onOpenArticle(featured.id)}
                isBookmarked={isBookmarked(featured.id)}
                onToggleBookmark={() => onToggleBookmark(featured.id)}
              />
            )}

            {rest.length > 0 && (
              <div className="mt-4">
                <p className="px-4 text-[13px] font-black text-[#0F172A] mb-3">More stories</p>
                <div className="flex flex-col gap-3">
                  {rest.map(article => (
                    <SmallCard
                      key={article.id}
                      article={article}
                      onOpen={() => onOpenArticle(article.id)}
                      isBookmarked={isBookmarked(article.id)}
                      onToggleBookmark={() => onToggleBookmark(article.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div
              className="mx-4 mt-5 mb-2 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(255,255,255,0.9)' }}
            >
              <p className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: BRAND.blue }}>About Zigo</p>
              <p className="text-xs font-medium text-[#64748B] leading-relaxed">
                Real world news, written so kids can understand it. No ads. No accounts. No drama.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
