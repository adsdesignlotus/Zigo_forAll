export interface KeyTerm {
  term: string;
  definition: string;
}

export interface Article {
  id: string;
  source: string;
  source_url: string;
  headline: string;
  summary: string;
  category: string;
  image: string;
  published_at: string;
  reading_time: number;
  what_happened: string;
  why_it_matters: string;
  context: string;
  did_you_know: string;
  key_terms: KeyTerm[];
  content: string[];
  think_about_it: string;
  related_articles: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  articleIds: string[];
}

export type Screen = 'onboarding' | 'home' | 'article' | 'explore' | 'saved' | 'search';
export type SavedTab = 'articles' | 'highlights' | 'notes';
export type TextSize = 'sm' | 'md' | 'lg';

export interface DictionaryEntry {
  word: string;
  meaning: string;
  example: string;
  moreContext?: string;
}

export interface HighlightEntry {
  articleId: string;
  text: string;
  date: string;
}

export interface NoteEntry {
  articleId: string;
  text: string;
  date: string;
}
