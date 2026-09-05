import { BookmarkIcon, HighlightIcon, EditIcon, TrashIcon, ClockIcon } from '../components/Icons';
import { ZigiMascot } from '../components/Mascot';
import { getCategoryColor } from '../data/colors';
import type { Article, SavedTab, HighlightEntry, NoteEntry } from '../types';

interface SavedScreenProps {
  articles: Article[];
  bookmarks: string[];
  highlights: HighlightEntry[];
  notes: NoteEntry[];
  savedTab: SavedTab;
  onSetSavedTab: (tab: SavedTab) => void;
  onOpenArticle: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function EmptyState({ mood, title, body }: { mood: 'sad' | 'think' | 'default'; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-72 px-8 text-center">
      <ZigiMascot size={90} mood={mood} />
      <p className="font-black text-[18px] text-[#0F172A] mt-3 mb-2"
        style={{ fontFamily: 'Nunito, sans-serif' }}>
        {title}
      </p>
      <p className="text-sm font-medium text-[#94A3B8] leading-relaxed">{body}</p>
    </div>
  );
}

const tabs: { id: SavedTab; label: string }[] = [
  { id: 'articles', label: 'Saved' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'notes', label: 'Notes' },
];

export default function SavedScreen({
  articles, bookmarks, highlights, notes, savedTab, onSetSavedTab, onOpenArticle, onRemoveBookmark,
}: SavedScreenProps) {
  const savedArticles = articles.filter(a => bookmarks.includes(a.id));

  const highlightsByArticle: Record<string, HighlightEntry[]> = {};
  highlights.forEach(h => {
    if (!highlightsByArticle[h.articleId]) highlightsByArticle[h.articleId] = [];
    highlightsByArticle[h.articleId].push(h);
  });

  return (
    <div className="flex flex-col h-full" style={{ background: '#EDE8F8' }}>
      {/* Header */}
      <div className="flex-none pt-12 pb-0 px-4" style={{ background: '#EDE8F8' }}>
        <h1
          className="text-[22px] font-black text-[#0F172A] mb-4"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          My library
        </h1>

        {/* Tabs */}
        <div className="flex gap-1.5 border-b border-[#D8CCF0]">
          {tabs.map(({ id, label }) => {
            const isActive = savedTab === id;
            return (
              <button
                key={id}
                onClick={() => onSetSavedTab(id)}
                className="flex-1 pb-3 text-[13px] font-black transition-colors relative"
                style={{ color: isActive ? '#0E6DFD' : '#94A3B8' }}
              >
                {label}
                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#0E6DFD] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">

        {/* ── Articles ── */}
        {savedTab === 'articles' && (
          <div className="pt-4 pb-4">
            {savedArticles.length === 0 ? (
              <EmptyState mood="sad" title="Nothing saved yet" body="Tap the bookmark icon on any story to save it here for later." />
            ) : (
              <div className="space-y-2.5 px-4">
                {savedArticles.map(article => {
                  const color = getCategoryColor(article.category);
                  return (
                    <div
                      key={article.id}
                      className="bg-white rounded-2xl overflow-hidden"
                      style={{ borderLeft: `4px solid ${color}`, boxShadow: '0 2px 8px rgba(14,109,253,0.06)' }}
                    >
                      <button onClick={() => onOpenArticle(article.id)} className="w-full flex gap-3 p-3 text-left">
                        <div className="flex-none w-20 h-16 rounded-xl overflow-hidden bg-[#DFECFD]">
                          <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black tracking-[0.12em] uppercase" style={{ color }}>
                            {article.category}
                          </span>
                          <p
                            className="text-[13px] font-bold leading-snug text-[#0F172A] line-clamp-2 mt-0.5"
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                          >
                            {article.headline}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#94A3B8]">
                            <ClockIcon size={10} /><span>{article.reading_time} min</span>
                          </div>
                        </div>
                      </button>
                      <div className="px-3 pb-2 flex justify-end" style={{ borderTop: '1px solid #F0F4F8' }}>
                        <button
                          onClick={() => onRemoveBookmark(article.id)}
                          className="flex items-center gap-1 text-[11px] font-bold text-red-400 py-1.5"
                        >
                          <TrashIcon size={12} />Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Highlights ── */}
        {savedTab === 'highlights' && (
          <div className="pt-4 pb-4">
            {highlights.length === 0 ? (
              <EmptyState mood="think" title="No highlights yet" body="Select text in any article and tap 'Highlight' to save important sentences here." />
            ) : (
              <div className="space-y-4 px-4">
                {Object.entries(highlightsByArticle).map(([articleId, articleHighlights]) => {
                  const article = articles.find(a => a.id === articleId);
                  if (!article) return null;
                  const color = getCategoryColor(article.category);
                  return (
                    <div key={articleId}>
                      <button onClick={() => onOpenArticle(articleId)} className="flex items-center gap-2 mb-2">
                        <img src={article.image} alt="" className="w-7 h-7 rounded-lg object-cover bg-blue-100" />
                        <p className="text-xs font-bold text-[#0F172A] line-clamp-1">{article.headline}</p>
                      </button>
                      <div className="space-y-2 pl-9">
                        {articleHighlights.map((h, i) => (
                          <div key={i} className="rounded-xl px-3 py-2.5"
                            style={{ background: '#FFFBEB', borderLeft: `3px solid #FDE68A` }}>
                            <p className="text-[13px] font-semibold leading-relaxed text-[#0F172A] italic">"{h.text}"</p>
                            <p className="text-[10px] font-semibold text-[#94A3B8] mt-1">{formatDate(h.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Notes ── */}
        {savedTab === 'notes' && (
          <div className="pt-4 pb-4">
            {notes.length === 0 ? (
              <EmptyState mood="default" title="No notes yet" body="Tap the note icon while reading an article to write down your thoughts and questions." />
            ) : (
              <div className="space-y-3 px-4">
                {notes.map((note, i) => {
                  const article = articles.find(a => a.id === note.articleId);
                  if (!article) return null;
                  const color = getCategoryColor(article.category);
                  return (
                    <div key={i} className="bg-white rounded-2xl p-4"
                      style={{ boxShadow: '0 2px 8px rgba(14,109,253,0.06)', border: '1.5px solid #E2EBF8' }}>
                      <button onClick={() => onOpenArticle(note.articleId)} className="flex items-center gap-2 mb-3 w-full text-left">
                        <img src={article.image} alt="" className="w-7 h-7 rounded-lg object-cover bg-blue-100" />
                        <div>
                          <p className="text-[9px] font-black tracking-wider uppercase" style={{ color }}>{article.category}</p>
                          <p className="text-xs font-bold text-[#0F172A] line-clamp-1">{article.headline}</p>
                        </div>
                      </button>
                      <div className="rounded-xl p-3"
                        style={{ background: '#F4F8FF', borderLeft: `3px solid ${color}` }}>
                        <p className="text-[13px] font-semibold leading-relaxed text-[#0F172A]">{note.text}</p>
                      </div>
                      <p className="text-[10px] font-semibold text-[#94A3B8] mt-2 text-right">{formatDate(note.date)}</p>
                    </div>
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
