import { useRef, useEffect } from 'react';
import { SearchIcon, ArrowLeftIcon, ClockIcon, XIcon } from '../components/Icons';
import { getCategoryColor } from '../data/colors';
import type { Article } from '../types';
import { categories } from '../data/mockData';
import {
  Newspaper, Microscope, Rocket, Cpu, Globe, Map,
  Leaf, Trophy, Landmark, type LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Top Stories': Newspaper, 'Science': Microscope, 'Space': Rocket,
  'Technology': Cpu, 'World': Globe, 'India': Map,
  'Nature': Leaf, 'Sports': Trophy, 'Culture': Landmark,
};

interface SearchScreenProps {
  articles: Article[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenArticle: (id: string) => void;
  onBack: () => void;
}

const recentSearches = ['Moon missions', 'deep ocean', 'solar energy', 'Amazon'];
const popularTopics = ['Space', 'Science', 'India', 'Nature', 'Technology', 'World', 'Sports', 'Culture'];

export default function SearchScreen({ articles, searchQuery, onSearchChange, onOpenArticle, onBack }: SearchScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const q = searchQuery.trim().toLowerCase();
  const results = q.length > 1
    ? articles.filter(a =>
        a.headline.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="flex flex-col h-full" style={{ background: '#EDE8F8' }}>
      {/* Header */}
      <div className="flex-none pt-12 pb-3 px-4" style={{ background: '#EDE8F8' }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center">
            <ArrowLeftIcon size={20} className="text-[#0F172A]" />
          </button>
          <div
            className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5"
            style={{ border: '1.5px solid #E2EBF8', boxShadow: '0 2px 8px rgba(14,109,253,0.06)' }}
          >
            <SearchIcon size={17} className="text-[#94A3B8] flex-none" />
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search topics, countries, science…"
              className="flex-1 text-sm font-semibold text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')}>
                <XIcon size={15} className="text-[#94A3B8]" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-28">
        {q.length <= 1 ? (
          <>
            <div className="pt-4 mb-6">
              <p className="text-[11px] font-black tracking-[0.18em] uppercase text-[#94A3B8] mb-3">Recent searches</p>
              <div className="divide-y divide-[#F0F4F8]">
                {recentSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => onSearchChange(s)}
                    className="w-full flex items-center gap-3 py-3"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#F0F4F8] flex items-center justify-center flex-none">
                      <ClockIcon size={13} className="text-[#94A3B8]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-black tracking-[0.18em] uppercase text-[#94A3B8] mb-3">Browse by topic</p>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map(topic => {
                  const color = getCategoryColor(topic);
                  const Icon = CATEGORY_ICONS[topic] || Newspaper;
                  return (
                    <button
                      key={topic}
                      onClick={() => onSearchChange(topic)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-black active:scale-95 transition-transform"
                      style={{ background: color, color: 'white', boxShadow: `0 3px 10px ${color}40` }}
                    >
                      <Icon size={13} strokeWidth={2.5} />
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="pt-4">
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-[#94A3B8] mb-3">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            {results.length === 0 ? (
              <div className="flex flex-col items-center h-52 text-center pt-10">
                <span className="text-5xl mb-3">🔍</span>
                <p className="font-black text-[#0F172A] mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>No stories found</p>
                <p className="text-sm font-medium text-[#94A3B8]">Try a different word or browse by topic.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {results.map(article => {
                  const color = getCategoryColor(article.category);
                  return (
                    <button
                      key={article.id}
                      onClick={() => onOpenArticle(article.id)}
                      className="w-full flex gap-3 bg-white rounded-2xl p-3 text-left active:scale-[0.98] transition-transform"
                      style={{ borderLeft: `4px solid ${color}`, boxShadow: '0 2px 8px rgba(14,109,253,0.06)' }}
                    >
                      <div className="flex-none w-16 h-14 rounded-xl overflow-hidden bg-[#DFECFD]">
                        <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black tracking-[0.12em] uppercase" style={{ color }}>
                          {article.category}
                        </span>
                        <p className="text-[13px] font-bold leading-snug text-[#0F172A] line-clamp-2 mt-0.5"
                          style={{ fontFamily: 'Nunito, sans-serif' }}>
                          {article.headline}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#94A3B8]">
                          <ClockIcon size={10} /><span>{article.reading_time} min</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
