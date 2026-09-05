import { useRef, useCallback, useState, useEffect } from 'react';
import {
  ArrowLeftIcon, BookmarkIcon, ShareIcon, MicIcon,
  TypeIcon, EditIcon, ClockIcon,
} from '../components/Icons';
import { ZigiMascot } from '../components/Mascot';
import { articles as allArticles } from '../data/mockData';
import { BRAND, getCategoryColor } from '../data/colors';
import type { Article, DictionaryEntry, TextSize } from '../types';

interface ArticleReaderProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  highlights: string[];
  onAddHighlight: (text: string) => void;
  note: string;
  onOpenNoteInput: () => void;
  onOpenDictionary: (entry: DictionaryEntry) => void;
  onOpenShare: (content: { text?: string; articleId: string }) => void;
  onToggleTTS: () => void;
  textSize: TextSize;
  onSetTextSize: (s: TextSize) => void;
  readingProgress: number;
  onSetReadingProgress: (p: number) => void;
  onBack: () => void;
  onOpenArticle: (id: string) => void;
  // TTS sync
  currentParagraph: number;
  isPlaying: boolean;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const TEXT_SIZES: Record<TextSize, string> = { sm: 'text-[14px]', md: 'text-[16px]', lg: 'text-[18px]' };
const TEXT_SIZES_NEXT: Record<TextSize, TextSize> = { sm: 'md', md: 'lg', lg: 'sm' };

function renderWithHighlights(
  text: string,
  highlights: string[],
  keyTerms: Article['key_terms'],
  onTermTap: (t: string, d: string) => void,
) {
  type Chunk = { text: string; type: 'plain' | 'highlight' | 'term'; def?: string };
  let chunks: Chunk[] = [{ text, type: 'plain' }];
  highlights.forEach(hl => {
    chunks = chunks.flatMap(c => {
      if (c.type !== 'plain') return [c];
      const parts = c.text.split(hl);
      if (parts.length === 1) return [c];
      const r: Chunk[] = [];
      parts.forEach((p, i) => {
        if (p) r.push({ text: p, type: 'plain' });
        if (i < parts.length - 1) r.push({ text: hl, type: 'highlight' });
      });
      return r;
    });
  });
  keyTerms.forEach(kt => {
    const regex = new RegExp(`\\b(${kt.term})\\b`, 'gi');
    chunks = chunks.flatMap(c => {
      if (c.type !== 'plain') return [c];
      const parts = c.text.split(regex);
      if (parts.length === 1) return [c];
      return parts.map(p =>
        p.toLowerCase() === kt.term.toLowerCase()
          ? { text: p, type: 'term' as const, def: kt.definition }
          : { text: p, type: 'plain' as const },
      );
    });
  });
  return chunks.map((c, i) => {
    if (c.type === 'highlight')
      return <mark key={i} style={{ background: '#FEF08A', borderRadius: 3, padding: '0 2px' }}>{c.text}</mark>;
    if (c.type === 'term')
      return (
        <button
          key={i}
          onClick={() => onTermTap(c.text, c.def || '')}
          className="font-bold underline decoration-dotted underline-offset-2"
          style={{ color: BRAND.blue }}
        >
          {c.text}
        </button>
      );
    return <span key={i}>{c.text}</span>;
  });
}

export default function ArticleReader({
  article, isBookmarked, onToggleBookmark, highlights, onAddHighlight,
  note, onOpenNoteInput, onOpenDictionary, onOpenShare, onToggleTTS,
  textSize, onSetTextSize, readingProgress, onSetReadingProgress,
  onBack, onOpenArticle, currentParagraph, isPlaying,
}: ArticleReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectionMenu, setSelectionMenu] = useState<{ text: string; visible: boolean } | null>(null);
  const [bookmarkFlash, setBookmarkFlash] = useState(false);

  const badgeColor = getCategoryColor(article.category);

  // Auto-scroll to the paragraph being read
  useEffect(() => {
    if (!isPlaying) return;
    const el = paragraphRefs.current[currentParagraph];
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const elTop = el.offsetTop;
      const target = elTop - container.clientHeight / 3;
      container.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, [currentParagraph, isPlaying]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    onSetReadingProgress(Math.min(1, Math.max(0, scrollTop / Math.max(1, scrollHeight - clientHeight))));
  }, [onSetReadingProgress]);

  const handleTextUp = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 3) setSelectionMenu({ text: sel.toString().trim(), visible: true });
    else setSelectionMenu(null);
  };

  const handleTermTap = (word: string, def: string) => {
    onOpenDictionary({ word, meaning: def, example: `The word "${word}" appears in this article.` });
  };

  const handleBookmark = () => {
    onToggleBookmark();
    setBookmarkFlash(true);
    setTimeout(() => setBookmarkFlash(false), 800);
  };

  const relatedArticles = allArticles.filter(a => article.related_articles.includes(a.id));
  const bodySize = TEXT_SIZES[textSize];

  return (
    <div className="flex flex-col h-full" style={{ background: '#FAFBFF' }}>
      {/* Reading progress bar — Zigo Blue always */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: '#EDE8F8' }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${readingProgress * 100}%`, background: BRAND.blue }}
        />
      </div>

      {/* Header */}
      <div
        className="flex-none pt-11 pb-3 px-4 flex items-center justify-between relative z-10"
        style={{ background: '#FAFBFF' }}
      >
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center"
          style={{ border: '1.5px solid #EDE8F8', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
        >
          <ArrowLeftIcon size={18} className="text-[#0F172A]" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenShare({ articleId: article.id })}
            className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center"
            style={{ border: '1.5px solid #EDE8F8', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
          >
            <ShareIcon size={17} className="text-[#0F172A]" />
          </button>
          <button
            onClick={handleBookmark}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
            style={{
              background: isBookmarked || bookmarkFlash ? BRAND.blue : 'white',
              border: isBookmarked || bookmarkFlash ? 'none' : '1.5px solid #EDE8F8',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              transform: bookmarkFlash ? 'scale(1.18)' : 'scale(1)',
            }}
          >
            <BookmarkIcon size={17} filled={isBookmarked}
              className={isBookmarked || bookmarkFlash ? 'text-white' : 'text-[#0F172A]'} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide pb-24"
        onScroll={handleScroll}
        onMouseUp={handleTextUp}
        onTouchEnd={handleTextUp}
      >
        {/* Hero image */}
        <div className="relative overflow-hidden" style={{ height: 200, background: '#DDD5F4' }}>
          <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, #FAFBFF 100%)' }}
          />
        </div>

        {/* Article meta + headline */}
        <div className="px-5 pt-3 pb-4">
          {/* Category + read time row */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] font-black tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: badgeColor + '18', color: badgeColor }}
            >
              {article.category}
            </span>
            <span className="text-[#CBD5E1] text-[10px]">·</span>
            <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: BRAND.blue }}>
              <ClockIcon size={11} />
              <span>{article.reading_time} min read</span>
            </div>
            <span className="text-[#CBD5E1] text-[10px]">·</span>
            <span className="text-[10px] font-medium text-[#94A3B8]">{article.source}</span>
          </div>

          {/* Headline */}
          <h1
            className="text-[21px] font-black leading-[1.25] text-[#0F172A] mb-3"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {article.headline}
          </h1>

          {/* Summary — italic hook */}
          <p className={`${bodySize} font-medium leading-[1.7] text-[#64748B] italic`}>
            {article.summary}
          </p>
        </div>

        {/* ── Now Reading mini-bar — visible when TTS is active ── */}
        {isPlaying && (
          <button
            onClick={onToggleTTS}
            className="mx-5 mb-4 flex items-center gap-2.5 w-[calc(100%-40px)] rounded-2xl px-4 py-2.5 active:scale-[0.98] transition-transform"
            style={{
              background: BRAND.blue,
              boxShadow: `0 4px 16px ${BRAND.blue}40`,
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <span className="text-white text-base">🔊</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-black leading-none">Now reading aloud</p>
              <p className="text-white/70 text-[10px] font-medium mt-0.5">
                Paragraph {currentParagraph + 1} of {article.content.length} · Tap to control
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-[11px]">⏸</span>
            </div>
          </button>
        )}

        {/* ── Article body ── */}
        <div className="px-5 space-y-4 pb-2">
          {article.content.map((para, i) => {
            const isActive = isPlaying && currentParagraph === i;
            return (
              <div
                key={i}
                ref={el => { paragraphRefs.current[i] = el; }}
                className="rounded-2xl transition-all duration-400"
                style={isActive ? {
                  background: `${BRAND.blue}0D`,
                  borderLeft: `3px solid ${BRAND.blue}`,
                  padding: '12px 14px',
                  margin: '0 -2px',
                } : { padding: '0' }}
              >
                <p className={`${bodySize} font-semibold leading-[1.8] text-[#0F172A]`}>
                  {renderWithHighlights(para, highlights, article.key_terms, handleTermTap)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="px-5 pt-5 space-y-5">
          {/* Why it matters — lightweight inline section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full flex-none" style={{ background: BRAND.teal }} />
              <p className="text-[11px] font-black tracking-[0.14em] uppercase" style={{ color: BRAND.teal }}>
                Why does it matter?
              </p>
            </div>
            <p className={`${bodySize} font-semibold leading-[1.75] text-[#0F172A]`}>
              {renderWithHighlights(article.why_it_matters, highlights, article.key_terms, handleTermTap)}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: '#EDE8F8' }} />

          {/* Did you know — always Amber — kept as a visual anchor */}
          <div
            className="rounded-2xl p-4 flex gap-3 items-start"
            style={{ background: '#FFFBEB', border: '2px solid #FDE68A' }}
          >
            <div className="flex-none">
              <ZigiMascot size={42} mood="think" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-1.5" style={{ color: BRAND.amber }}>
                Did you know?
              </p>
              <p className={`${bodySize} font-semibold leading-[1.65] text-[#0F172A] italic`}>
                {article.did_you_know}
              </p>
            </div>
          </div>

          {/* Key terms — compact tappable pill strip */}
          {article.key_terms.length > 0 && (
            <div>
              <p className="text-[11px] font-black tracking-[0.14em] uppercase text-[#94A3B8] mb-2.5">
                Key words — tap to look up
              </p>
              <div className="flex flex-wrap gap-2">
                {article.key_terms.map(kt => (
                  <button
                    key={kt.term}
                    onClick={() => onOpenDictionary({ word: kt.term, meaning: kt.definition, example: `Tap to learn more about "${kt.term}".` })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                    style={{
                      background: `${BRAND.blue}12`,
                      border: `1.5px solid ${BRAND.blue}30`,
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                      style={{ background: BRAND.blue }}
                    >
                      K
                    </span>
                    <span className="text-[12px] font-bold" style={{ color: BRAND.blue }}>{kt.term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Think about it — Purple — closing hook */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #EDE9FE, #F5F3FF)', border: '1.5px solid #DDD6FE' }}
          >
            <div className="px-4 py-2.5" style={{ background: BRAND.purple }}>
              <span className="text-white text-[11px] font-black tracking-[0.12em] uppercase">Think about it 💭</span>
            </div>
            <div className="flex gap-3 p-4 items-start">
              <div className="flex-none">
                <ZigiMascot size={46} mood="default" />
              </div>
              <div className="flex-1">
                <p
                  className="text-[15px] font-bold leading-relaxed text-[#0F172A]"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {article.think_about_it}
                </p>
                {note && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid #DDD6FE' }}>
                    <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: BRAND.purple }}>Your note</p>
                    <p className="text-[12px] font-medium text-[#64748B] italic leading-snug">{note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-[10px] font-medium text-[#94A3B8]">
            Source: {article.source} · {formatDate(article.published_at)} · Adapted by Zigo for young readers
          </p>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-6">
            <p className="text-[13px] font-black text-[#0F172A] px-5 mb-3">You might also like</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
              {relatedArticles.map(rel => {
                const rBadge = getCategoryColor(rel.category);
                return (
                  <button
                    key={rel.id}
                    onClick={() => onOpenArticle(rel.id)}
                    className="flex-none w-52 rounded-2xl bg-white overflow-hidden text-left active:scale-[0.97] transition-transform"
                    style={{ border: '1.5px solid #EDE8F8', boxShadow: '0 4px 16px rgba(28,25,38,0.07)' }}
                  >
                    <div className="h-28 overflow-hidden" style={{ background: '#DDD5F4' }}>
                      <img src={rel.image} alt={rel.headline} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <span
                        className="text-[9px] font-black tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                        style={{ background: rBadge + '18', color: rBadge }}
                      >
                        {rel.category}
                      </span>
                      <p
                        className="text-[13px] font-bold leading-snug text-[#0F172A] mt-1 line-clamp-2"
                        style={{ fontFamily: 'Nunito, sans-serif' }}
                      >
                        {rel.headline}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-[#94A3B8]">
                        <ClockIcon size={10} />
                        <span>{rel.reading_time} min</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="h-8" />
      </div>

      {/* Text selection menu */}
      {selectionMenu?.visible && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 z-30 rounded-2xl flex overflow-hidden shadow-xl"
          style={{ background: '#0F172A', animation: 'fadeIn 0.15s ease-out' }}
        >
          {[
            { label: 'Highlight', action: () => { onAddHighlight(selectionMenu.text); setSelectionMenu(null); window.getSelection()?.removeAllRanges(); } },
            { label: 'Explain', action: () => { onOpenDictionary({ word: selectionMenu.text.split(' ')[0], meaning: 'Select a single word for a definition.', example: '' }); setSelectionMenu(null); } },
            { label: 'Note', action: () => { onOpenNoteInput(); setSelectionMenu(null); } },
            { label: 'Share', action: () => { onOpenShare({ text: selectionMenu.text, articleId: article.id }); setSelectionMenu(null); } },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              onClick={item.action}
              className="px-4 py-2.5 text-white text-[12px] font-bold active:bg-white/20"
              style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => setSelectionMenu(null)} className="px-3 py-2.5 text-white/40 text-xs">✕</button>
        </div>
      )}

      {/* Reading toolbar */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white flex items-center justify-around px-4 py-3"
        style={{ borderTop: '1.5px solid #EDE8F8' }}
      >
        {[
          {
            icon: <BookmarkIcon size={20} filled={isBookmarked} className={isBookmarked ? 'text-[#0E6DFD]' : 'text-[#94A3B8]'} />,
            label: 'Save', action: handleBookmark, active: isBookmarked,
          },
          {
            icon: <MicIcon size={20} className={isPlaying ? 'text-[#0E6DFD]' : 'text-[#94A3B8]'} />,
            label: isPlaying ? 'Playing' : 'Listen', action: onToggleTTS, active: isPlaying,
          },
          {
            icon: <TypeIcon size={20} className="text-[#94A3B8]" />,
            label: 'Size', action: () => onSetTextSize(TEXT_SIZES_NEXT[textSize]), active: false,
          },
          {
            icon: <EditIcon size={20} className={note ? 'text-[#0E6DFD]' : 'text-[#94A3B8]'} />,
            label: 'Note', action: onOpenNoteInput, active: !!note,
          },
          {
            icon: <ShareIcon size={20} className="text-[#94A3B8]" />,
            label: 'Share', action: () => onOpenShare({ articleId: article.id }), active: false,
          },
        ].map(({ icon, label, action, active }) => (
          <button key={label} onClick={action} className="flex flex-col items-center gap-0.5">
            {icon}
            <span className="text-[9px] font-bold" style={{ color: active ? BRAND.blue : '#94A3B8' }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-6px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
      `}</style>
    </div>
  );
}
