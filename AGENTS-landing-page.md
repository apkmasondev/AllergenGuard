# AGENTS.md — landing page dla aplikacji (Allergen & Diet Guard)

## Cel
Zbuduj jednostronicowy landing page prezentujący aplikację. Efekt "wow" wizualnie,
ale przede wszystkim szybki, dostępny i poprawny technicznie wg standardów 2026.

## Obowiązkowe elementy strony
- Hero z nazwą, jednym zdaniem opisującym wartość appki i dwoma wyraźnymi CTA:
  1. **Pobierz APK** — link bezpośredni do pliku `.apk` (przycisk primary)
  2. **Zobacz kod na GitHub** — link do repozytorium (przycisk secondary/outline)
- Krótka sekcja "jak to działa" (3 kroki: skanuj → sprawdzamy skład → wynik)
- Sekcja funkcji/zalet (alergie, diety, offline)
- Stopka z linkiem do repo i licencją (jeśli dotyczy)
- Linki CTA mają być widoczne bez scrollowania (above the fold) i powtórzone w stopce

## Technologia
- Statyczny HTML/CSS/JS (ewentualnie Astro, jeśli agent ma taką możliwość) —
  **żadnego zbędnego frameworka SPA** dla prostej strony jednoekranowej. Mniej JS =
  lepsze Core Web Vitals.
- Zero zależności od ciężkich bibliotek UI — czysty CSS lub lekki Tailwind (build-time,
  nie CDN w wersji produkcyjnej).
- Hosting statyczny (GitHub Pages / Netlify / Vercel) — pasuje do repo na GitHubie.

## Wydajność (Core Web Vitals — obowiązkowe progi)
- **LCP** (Largest Contentful Paint) < 2.5s
- **INP** (Interaction to Next Paint) < 200ms
- **CLS** (Cumulative Layout Shift) < 0.1
- Zasady:
  - obrazy w formacie **WebP/AVIF**, z jawnym `width`/`height` (brak layout shift)
  - `loading="lazy"` dla wszystkiego poza hero
  - brak render-blocking JS/CSS w `<head>` — krytyczny CSS inline, reszta async/defer
  - jedna czcionka własna (variable font) z `font-display: swap`, max 1-2 grubości
  - brak zewnętrznych skryptów trackingowych, chyba że wyraźnie potrzebne
  - obraz hero zoptymalizowany i preloadowany (`<link rel="preload">`)

## SEO i AI-search (2026)
- Semantyczny HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`), jeden `<h1>`
- Meta tagi: `title`, `description`, `og:*` (Open Graph) i `twitter:card` z obrazkiem
  podglądu (żeby link ładnie wyglądał po wklejeniu na Discord/X/Messenger)
- Dane strukturalne **JSON-LD** typu `SoftwareApplication` (nazwa, opis, kategoria,
  platforma, link do pobrania)
- Plik `robots.txt` i `sitemap.xml`
- Plik **`llms.txt`** w katalogu głównym — krótkie, czyste markdown streszczenie strony
  i linki (nazwa appki, opis, link do APK, link do repo) — ułatwia poprawne cytowanie
  przez AI-wyszukiwarki i agentów
- Treść pisana wprost, jedno-dwa zdania na sekcję ("answer-first") — łatwe do zacytowania
  zarówno przez Google, jak i przez LLM-y
- Tekst alternatywny (`alt`) dla wszystkich obrazów

## Dostępność (WCAG)
- Kontrast tekstu min. AA (4.5:1 dla tekstu podstawowego)
- Wszystkie interaktywne elementy dostępne z klawiatury, widoczny `:focus-visible`
- `aria-label` na przyciskach-ikonach
- Responsywność: mobile-first, pełna użyteczność od 320px szerokości

## Efekt "wow" — jak go osiągnąć bez psucia wydajności
- Subtelna animacja hero (np. telefon z aplikacją, kod EAN "skanowany" — CSS/SVG
  animation, nie ciężki JS/wideo)
- Micro-interakcje na hover/scroll (CSS `transition`, `scroll-timeline` / IntersectionObserver
  z lekkim JS) — mają być płynne, nie efekciarskie kosztem INP
- Mocna typografia i przemyślana paleta kolorów (spójna z ikoną appki: zielony/czerwony
  jako motyw "safe/unsafe")
- Prawdziwy screenshot/mockup appki w telefonie (nie stockowa grafika) jako element hero

## Czego unikać
- Ciężkich frameworków JS dla prostej jednostronicowej strony
- Autoplay wideo z dźwiękiem, popupów zasłaniających treść przy wejściu
- CDN-owych wersji bibliotek CSS/JS w produkcji (zamiast tego: build i self-host)
- Linków "Pobierz" i "Repo" ukrytych za dodatkowym scrollem/klikiem
- Fałszywych/pustych sekcji (np. fikcyjne opinie użytkowników, nieistniejące statystyki)

## Checklist przed publikacją
- [ ] Link do APK działa i wskazuje na aktualną wersję
- [ ] Link do repo GitHub działa
- [ ] Lighthouse: Performance, SEO, Accessibility, Best Practices ≥ 90
- [ ] Strona wygląda i działa poprawnie na 320px oraz na desktopie
- [ ] `llms.txt`, `robots.txt`, `sitemap.xml`, JSON-LD obecne i poprawne
- [ ] Brak console errors/warnings
