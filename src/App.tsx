import { useState, useCallback, useEffect } from 'react';
import { articles } from './data/mockData';
import type { Screen, SavedTab, TextSize, DictionaryEntry, HighlightEntry, NoteEntry } from './types';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ArticleReader from './screens/ArticleReader';
import ExploreScreen from './screens/ExploreScreen';
import SavedScreen from './screens/SavedScreen';
import SearchScreen from './screens/SearchScreen';
import BottomNav from './components/BottomNav';
import DictionarySheet from './components/DictionarySheet';
import TTSPlayer from './components/TTSPlayer';
import ShareSheet from './components/ShareSheet';
import NoteModal from './components/NoteModal';

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}

export default function App() {
  // Navigation
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // Feed state
  const [activeCategory, setActiveCategory] = useState('Top Stories');
  const [savedTab, setSavedTab] = useState<SavedTab>('articles');
  const [searchQuery, setSearchQuery] = useState('');

  // Reading state
  const [textSize, setTextSize] = useState<TextSize>('md');
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Persistent user data
  const [bookmarks, setBookmarks] = useState<string[]>(() => load('zigo-bookmarks', []));
  const [highlights, setHighlights] = useState<HighlightEntry[]>(() => load('zigo-highlights', []));
  const [notes, setNotes] = useState<NoteEntry[]>(() => load('zigo-notes', []));

  // Overlay state
  const [dictionaryEntry, setDictionaryEntry] = useState<DictionaryEntry | null>(null);
  const [showTTS, setShowTTS] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [shareContent, setShareContent] = useState<{ text?: string; articleId: string } | null>(null);

  // Persist user data
  useEffect(() => { localStorage.setItem('zigo-bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('zigo-highlights', JSON.stringify(highlights)); }, [highlights]);
  useEffect(() => { localStorage.setItem('zigo-notes', JSON.stringify(notes)); }, [notes]);

  const stopTTS = useCallback(() => {
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setShowTTS(false);
  }, []);

  const navigate = useCallback((to: Screen) => {
    setPrevScreen(screen);
    setScreen(to);
    setReadingProgress(0);
    setCurrentParagraph(0);
    stopTTS();
  }, [screen, stopTTS]);

  const openArticle = useCallback((id: string) => {
    setActiveArticleId(id);
    setPrevScreen(screen);
    setScreen('article');
    setReadingProgress(0);
    setCurrentParagraph(0);
    stopTTS();
  }, [screen, stopTTS]);

  const goBack = useCallback(() => {
    stopTTS();
    setScreen(prevScreen || 'home');
    setPrevScreen(null);
  }, [prevScreen, stopTTS]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  }, []);

  const addHighlight = useCallback((articleId: string, text: string) => {
    setHighlights(prev => {
      if (prev.some(h => h.articleId === articleId && h.text === text)) return prev;
      return [...prev, { articleId, text, date: new Date().toISOString().split('T')[0] }];
    });
  }, []);

  const addNote = useCallback((articleId: string, text: string) => {
    setNotes(prev => {
      const filtered = prev.filter(n => n.articleId !== articleId);
      if (!text.trim()) return filtered;
      return [...filtered, { articleId, text, date: new Date().toISOString().split('T')[0] }];
    });
    setShowNoteInput(false);
  }, []);

  const activeArticle = activeArticleId ? articles.find(a => a.id === activeArticleId) ?? null : null;
  const isBookmarked = (id: string) => bookmarks.includes(id);
  const showNav = screen !== 'onboarding' && screen !== 'article';
  const navActive = screen === 'search' ? 'search'
    : screen === 'explore' ? 'explore'
    : screen === 'saved' ? 'saved'
    : 'home';

  const hasOverlay = !!(dictionaryEntry || showTTS || showNoteInput || shareContent);

  return (
    <div className="flex justify-center min-h-screen" style={{ background: '#B8ADE0' }}>
      <div
        className="relative flex flex-col bg-zbg overflow-hidden"
        style={{ width: '100%', maxWidth: 430, minHeight: '100dvh', height: '100dvh' }}
      >
        {/* Screens */}
        <div className="flex-1 overflow-hidden">
          {screen === 'onboarding' && (
            <div className="h-full">
              <OnboardingScreen onComplete={() => navigate('home')} />
            </div>
          )}

          {screen === 'home' && (
            <div className="h-full">
              <HomeScreen
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onOpenArticle={openArticle}
                isBookmarked={isBookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          )}

          {screen === 'article' && activeArticle && (
            <div key={activeArticle.id} className="h-full screen-slide-up">
              <ArticleReader
                article={activeArticle}
                isBookmarked={isBookmarked(activeArticle.id)}
                onToggleBookmark={() => toggleBookmark(activeArticle.id)}
                highlights={highlights.filter(h => h.articleId === activeArticle.id).map(h => h.text)}
                onAddHighlight={text => addHighlight(activeArticle.id, text)}
                note={notes.find(n => n.articleId === activeArticle.id)?.text || ''}
                onOpenNoteInput={() => setShowNoteInput(true)}
                onOpenDictionary={setDictionaryEntry}
                onOpenShare={setShareContent}
                onToggleTTS={() => setShowTTS(p => !p)}
                textSize={textSize}
                onSetTextSize={setTextSize}
                readingProgress={readingProgress}
                onSetReadingProgress={setReadingProgress}
                onBack={goBack}
                onOpenArticle={openArticle}
                currentParagraph={currentParagraph}
                isPlaying={isPlaying}
              />
            </div>
          )}

          {screen === 'explore' && (
            <div className="h-full">
              <ExploreScreen
                onOpenArticle={openArticle}
                onSearch={() => navigate('search')}
              />
            </div>
          )}

          {screen === 'saved' && (
            <div className="h-full">
              <SavedScreen
                articles={articles}
                bookmarks={bookmarks}
                highlights={highlights}
                notes={notes}
                savedTab={savedTab}
                onSetSavedTab={setSavedTab}
                onOpenArticle={openArticle}
                onRemoveBookmark={toggleBookmark}
              />
            </div>
          )}

          {screen === 'search' && (
            <div className="h-full">
              <SearchScreen
                articles={articles}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenArticle={openArticle}
                onBack={() => { setSearchQuery(''); navigate('home'); }}
              />
            </div>
          )}
        </div>

        {/* Bottom nav */}
        {showNav && (
          <BottomNav
            active={navActive as 'home' | 'search' | 'explore' | 'saved'}
            onHome={() => navigate('home')}
            onSearch={() => navigate('search')}
            onExplore={() => navigate('explore')}
            onSaved={() => navigate('saved')}
          />
        )}

        {/* Overlay: dim backdrop for any overlay */}
        {hasOverlay && !showTTS && (
          <div className="absolute inset-0 z-40 pointer-events-none" />
        )}

        {/* Dictionary sheet */}
        {dictionaryEntry && (
          <DictionarySheet
            entry={dictionaryEntry}
            onClose={() => setDictionaryEntry(null)}
          />
        )}

        {/* TTS player */}
        {showTTS && activeArticle && (
          <TTSPlayer
            article={activeArticle}
            isPlaying={isPlaying}
            speed={ttsSpeed}
            currentParagraph={currentParagraph}
            onSetPlaying={setIsPlaying}
            onSetSpeed={setTtsSpeed}
            onSetParagraph={setCurrentParagraph}
            onClose={stopTTS}
          />
        )}

        {/* Share sheet */}
        {shareContent && (
          <ShareSheet
            content={shareContent}
            article={articles.find(a => a.id === shareContent.articleId)!}
            onClose={() => setShareContent(null)}
          />
        )}

        {/* Note modal */}
        {showNoteInput && activeArticle && (
          <NoteModal
            existingNote={notes.find(n => n.articleId === activeArticle.id)?.text || ''}
            onSave={text => addNote(activeArticle.id, text)}
            onClose={() => setShowNoteInput(false)}
          />
        )}
      </div>
    </div>
  );
}
