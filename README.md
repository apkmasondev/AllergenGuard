# Allergen & Diet Guard — Landing Page

Oficjalny, bezszablonowy landing page dla aplikacji Android **Allergen & Diet Guard**.

Strona została zbudowana jako lekki, statyczny serwis HTML5/CSS3/Vanilla JS z myślą o publikacji w osobnym repozytorium GitHub: `https://github.com/apkmasondev/AllergenGuard.git` (np. poprzez GitHub Pages).

## Funkcje Strony Landing Page
- **Bezszablonowy UX**: Zawiera autorski, interaktywny symulator skanera kodów EAN w czasie rzeczywistym.
- **Szybkość i Core Web Vitals (2026)**: Brak ciążących frameworków SPA, czysty HTML/CSS/JS, obrazy zoptymalizowane do formatu WebP.
- **Dostępność i SEO**: Pełne wsparcie WCAG AA, dane strukturalne JSON-LD `SoftwareApplication`, Open Graph, Twitter Cards, plik `llms.txt`, `robots.txt` oraz `sitemap.xml`.
- **Prezentacja aplikacji**: Sekcja hero z przyciskami CTA (bezpośrednie pobranie APK oraz odnośnik do repozytorium GitHub) oraz galeria ze zrzutami ekranu z prawdziwej aplikacji Android.

## Struktura Katalogu
```text
landing-page/
├── index.html        # Semantyczna struktura HTML5 i sekcja hero z CTA
├── styles.css        # Autorski Design System, glassmorphism, motywy
├── app.js            # Logika symulatora skanowania EAN w czasie rzeczywistym
├── llms.txt          # Podsumowanie i metadane dla robotów i agentów AI
├── robots.txt        # Wskazówki dla robotów indeksujących
├── sitemap.xml       # Mapa strony dla wyszukiwarek
└── assets/           # Zoptymalizowane zrzuty ekranu w formacie WebP i JPG
```

## Publikacja na GitHub Pages
1. Inicjalizacja repozytorium w tym katalogu:
   ```bash
   git init
   git remote add origin https://github.com/apkmasondev/AllergenGuard.git
   git add .
   git commit -m "feat: initial release of Allergen Guard landing page"
   git push -u origin main
   ```
2. W ustawieniach repozytorium GitHub (*Settings -> Pages*) wskaż gałąź `main` jako źródło publikacji.
