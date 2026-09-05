Design and prototype a production-quality mobile-first B2C MVP for Zigo.

ZIGO is a child-friendly world news app that helps children understand what is happening in the world. It is NOT a tutoring app, storybook app, chatbot, social network or gamified learning app.

The MVP has NO login, NO user profile and NO subscription. It is a frictionless free reading experience designed to validate whether children enjoy discovering and understanding real-world news.

CORE PRODUCT IDEA

Open Zigo → discover interesting news → read → understand → explore → save/share → come back for more.

The experience should feel as effortless as Inshorts, as readable as a premium editorial publication, and as thoughtful as Kindle.

TARGET USERS

Primary: children approximately 8–15.
Secondary: parents discovering Zigo with their children.

Design for children without making the interface look childish. Avoid cartoon-heavy UI, excessive gamification, childish illustrations, bright rainbow colours or school-like worksheets.

BRAND

Use Zigo's existing visual identity and blue-led palette:
Primary blue: #0E6DFD
Background: #F8FBFF
Surface: #DFECFD
Text: #1D2433

Use generous whitespace, rounded cards, strong typography, subtle borders, soft elevation and editorial-style imagery.

The overall feeling should be:
Curious
Modern
Smart
Warm
Trustworthy
Premium
Easy

NAVIGATION

Create a bottom navigation with:

Home
Explore
Saved

Keep navigation extremely simple.

HOME / LAUNCH EXPERIENCE

Design the complete first-open experience.

The user should immediately understand:

"What is Zigo?"

Suggested positioning:
"News for curious minds."

Supporting copy:
"Understand what's happening in the world, one story at a time."

Do not make the launch experience feel like a marketing landing page inside the app.

Include:
- Zigo logo
- Short introduction
- Continue / Explore button
- Optional lightweight onboarding slides explaining the reading experience

Do not require signup.

HOME FEED

Create a highly polished editorial news feed.

Sections:

Top Stories
Science
Space
Technology
World
India
Nature
Sports
Culture

Each news card should include:
- Image
- Category
- Headline
- Short 1–2 sentence summary
- Reading time
- Source attribution

Prioritise interesting, visual and curiosity-driven stories.

Examples:
"Scientists found something strange under Antarctica"
"Why are countries sending missions to the Moon?"
"A new material could change how buildings are made"

Avoid sensational clickbait.

Include horizontal category switching and smooth transitions.

STORY READER

This is the most important screen in the app.

Design a premium distraction-free reading experience.

Each article should contain:

Category
Headline
Hero image
Source + date
"What happened?"
Main explanation
"Why does it matter?"
Context / background
"Did you know?"
Key terms
"Think about it"

Use short paragraphs, generous line spacing and clear hierarchy.

The article should never feel like a simplified newspaper pasted into an app.

It should feel designed specifically for a young reader.

READING CONTROLS

Create a floating or accessible reading toolbar with:

Bookmark
Highlight
Text-to-speech
Text size
Notes
Share

Make the toolbar elegant and unobtrusive.

TEXT SELECTION

When the child long-presses/selects text, show a contextual action menu:

Highlight
Explain
Add note
Share

SHARE SELECTED TEXT

Allow the user to select a sentence or paragraph and share:

The selected text
Article headline
Zigo attribution
Article link

Create a polished share preview.

HIGHLIGHTS

Allow children to highlight important sentences.

Create a Highlights view under Saved where they can see:

Article
Highlighted text
Date

Use a restrained visual treatment. Do not make it look like a school notebook.

DICTIONARY / EXPLAIN FEATURE

Inspired by Kindle.

When the child taps an unfamiliar word, show a small bottom sheet:

WORD
Simple child-friendly meaning
Example sentence

Example:

"orbit"
"the curved path an object follows around a planet, moon or star."

The explanation should be short and easy to understand.

Include:
"More context" when relevant.

Do not turn this into a chatbot.

TEXT TO SPEECH

Add a polished text-to-speech player.

Controls:
Play / Pause
Progress
Playback speed
Previous / Next paragraph

Include options such as:
0.75x
1x
1.25x
1.5x

The article should visibly indicate the sentence currently being read.

BOOKMARKS / SAVED

Create a Saved section containing:

Saved Articles
Highlights
Notes

Each saved article card should show:
Image
Headline
Category
Date saved

Allow swipe/delete or remove bookmark.

NOTES

Allow users to attach a personal note to an article or selected text.

Example:
"My question: Why can't all countries launch rockets?"

Notes should be private to the device in the MVP.

Do not require account creation.

EXPLORE

Create an Explore screen where children can browse categories.

Use visual category cards for:

World
India
Science
Space
Technology
Nature
Sports
Culture

Also include curated discovery collections such as:

"Things happening in Space"
"Strange but True"
"Big Ideas"
"How Things Work"
"Planet Earth"
"What's New?"

These should be editorial collections, not algorithmic social feeds.

ARTICLE TO ARTICLE NAVIGATION

After finishing an article, show:

"You might also like"

with 3 relevant stories.

Allow easy movement to:
Previous story
Next story
Related story

The user should never feel trapped inside an article.

READING EXPERIENCE

Include:
- Reading progress
- Estimated reading time
- Optional audio
- Clean typography
- Image captions
- Source attribution
- Back navigation
- Save state

Do not show distracting engagement metrics such as likes, follower counts or comments.

SEARCH

Include simple search.

Search by:
Topic
Country
Science
Space
Technology
etc.

Show recent searches locally.

NO LOGIN MVP

All of the following should work without an account:

Reading
Bookmarking
Highlights
Notes
Text-to-speech
Dictionary
Sharing

Persist saved content locally on the device.

ARCHITECTURE / DATA

Design the UI using realistic structured news data.

Each story should conceptually support:

id
source
source_url
headline
summary
category
image
published_at
reading_time
what_happened
why_it_matters
context
did_you_know
key_terms
content
related_articles

Do not hard-code these values into visual components in a way that prevents connecting a real backend later.

CONTENT PIPELINE ASSUMPTION

The app will eventually receive content from:

External News APIs
↓
Zigo content pipeline
↓
Safety filtering
↓
AI transformation
↓
Quality review
↓
Zigo database
↓
Mobile app

For this prototype, use realistic mock content, but design the frontend so the backend can later provide real content through APIs.

MICROINTERACTIONS

Add subtle:
- bookmark animation
- highlight confirmation
- category transitions
- reading progress
- audio state
- save confirmation
- smooth bottom sheets
- meaningful empty states

Do not over-animate.

ACCESSIBILITY

Use:
- large readable text
- sufficient contrast
- minimum comfortable touch targets
- adjustable text size
- audio support
- simple navigation
- clear labels

PARENT TRUST

The UI should subtly communicate that Zigo is designed specifically for children without making parents feel that the product is restrictive.

Include appropriate source attribution and a simple "About Zigo" section.

DO NOT INCLUDE

No login
No signup
No subscription
No payment
No ads
No social feed
No comments
No messaging
No child-to-child communication
No streak pressure
No leaderboards
No excessive badges
No chatbot
No AI assistant interface
No fake testimonials
No lorem ipsum

DESIGN DELIVERABLE

Create a complete clickable mobile prototype covering:

1. First launch
2. Home
3. Category browsing
4. Article list
5. Full article
6. Text selection
7. Dictionary explanation
8. Highlight
9. Add note
10. Text-to-speech
11. Bookmark
12. Saved articles
13. Highlights
14. Notes
15. Search
16. Related articles
17. Share article
18. Share selected text
19. Empty states
20. About Zigo

Create reusable components and a consistent design system.

The final result should look like a real consumer product ready for beta launch, not a UI concept or school project.

PRIORITY:

Spend most design effort on the HOME FEED and ARTICLE READING EXPERIENCE.

The core product promise is:

"Zigo makes the world easier for children to understand."