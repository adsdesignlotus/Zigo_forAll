import { SearchIcon, ClockIcon } from '../components/Icons';
import { articles, categories, collections } from '../data/mockData';
import { getCategoryColor } from '../data/colors';
import type { Collection } from '../types';
import {
  Newspaper, Microscope, Rocket, Cpu, Globe, Map,
  Leaf, Trophy, Landmark, type LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Top Stories': Newspaper, 'Science': Microscope, 'Space': Rocket,
  'Technology': Cpu, 'World': Globe, 'India': Map,
  'Nature': Leaf, 'Sports': Trophy, 'Culture': Landmark,
};

interface ExploreScreenProps {
  onOpenArticle: (id: string) => void;
  onSearch: () => void;
}

function CategoryCard({ name, color, onClick }: { name: string; color: string; onClick: () => void }) {
  const Icon = CATEGORY_ICONS[name] || Newspaper;
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-between rounded-3xl p-4 active:scale-95 transition-transform overflow-hidden relative"
      style={{ background: color, minHeight: 110, boxShadow: `0 6px 20px ${color}40` }}
    >
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
        style={{ background: 'white' }}
      />
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.22)' }}
      >
        <Icon size={24} color="white" strokeWidth={2} />
      </div>
      <span className="text-[14px] font-black text-white leading-tight mt-auto pt-3">{name}</span>
    </button>
  );
}

function CollectionCard({ collection, onClick }: { collection: Collection; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-none w-44 rounded-3xl overflow-hidden bg-white text-left active:scale-[0.97] transition-transform"
      style={{ boxShadow: '0 6px 20px rgba(28,25,38,0.10)', border: '1.5px solid rgba(255,255,255,0.9)' }}
    >
      <div className="h-28 bg-[#DDD5F4] overflow-hidden">
        <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3.5">
        <p className="text-[13px] font-black text-[#0F172A] leading-snug mb-1">{collection.title}</p>
        <p className="text-[11px] font-medium text-[#94A3B8] line-clamp-2">{collection.description}</p>
        <p
          className="text-[10px] font-black mt-2.5 px-2.5 py-1 rounded-full inline-block"
          style={{ background: '#EDE8F8', color: '#5B35E0' }}
        >
          {collection.articleIds.length} stories
        </p>
      </div>
    </button>
  );
}

export default function ExploreScreen({ onOpenArticle, onSearch }: ExploreScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#EDE8F8' }}>
      {/* Header */}
      <div className="flex-none pt-12 pb-4 px-4" style={{ background: '#EDE8F8' }}>
        <h1
          className="text-[24px] font-black text-[#0F172A] mb-4"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Explore
        </h1>
        <button
          onClick={onSearch}
          className="w-full flex items-center gap-3 bg-white rounded-full px-4 py-3"
          style={{ boxShadow: '0 4px 16px rgba(28,25,38,0.09)' }}
        >
          <SearchIcon size={17} className="text-[#94A3B8]" />
          <span className="text-sm font-semibold text-[#94A3B8]">Search topics, countries, science…</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
        {/* Category grid — 2 columns */}
        <div className="px-4 mb-6">
          <p className="text-[13px] font-black text-[#0F172A] mb-3">Browse by category</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.filter(c => c.id !== 'top').map(cat => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                color={getCategoryColor(cat.name)}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="mb-6">
          <p className="text-[13px] font-black text-[#0F172A] px-4 mb-3">
            Editorial collections
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
            {collections.map(col => (
              <CollectionCard
                key={col.id}
                collection={col}
                onClick={() => { const id = col.articleIds[0]; if (id) onOpenArticle(id); }}
              />
            ))}
          </div>
        </div>

        {/* All stories */}
        <div className="px-4">
          <p className="text-[13px] font-black text-[#0F172A] mb-3">All stories</p>
          <div className="space-y-3">
            {articles.map(article => {
              const color = getCategoryColor(article.category);
              return (
                <button
                  key={article.id}
                  onClick={() => onOpenArticle(article.id)}
                  className="w-full flex gap-3 bg-white rounded-3xl p-4 text-left active:scale-[0.98] transition-transform"
                  style={{ boxShadow: '0 4px 16px rgba(28,25,38,0.07)' }}
                >
                  <div className="flex-none w-16 h-14 rounded-2xl overflow-hidden bg-[#DDD5F4]">
                    <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[9px] font-black tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                      style={{ background: `${color}18`, color }}
                    >
                      {article.category}
                    </span>
                    <p className="text-[13px] font-bold leading-snug text-[#0F172A] line-clamp-2 mt-1"
                      style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {article.headline}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-[#94A3B8]">
                      <ClockIcon size={10} /><span>{article.reading_time} min</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}
