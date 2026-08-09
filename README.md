# Allergen & Diet Guard — Landing Page

Oficjalny, bezszablonowy landing page dla aplikacji Android **Allergen & Diet Guard**.

Strona została zbudowana jako lekki, statyczny serwis HTML5/CSS3/Vanilla JS z myślą o publikacji w repozytorium GitHub: `https://github.com/apkmasondev/AllergenGuard_apk` (poprzez GitHub Pages).

## Funkcje Strony Landing Page
- **Bezszablonowy UX**: Zawiera autorski, interaktywny symulator skanera kodów EAN w czasie rzeczywistym.
- **Bezpośrednie Pobieranie APK**: Przycisk pobierania wskazuje bezpośrednio na plik `assets/AllergenGuard-1.0.apk`.
- **Zoptymalizowane Grafiki**: Wszystkie zrzuty ekranu zostały przemianowane na czytelne nazwy `screen1.webp` – `screen10.webp` oraz skompresowane do formatu WebP.
- **Szybkość i Core Web Vitals (2026)**: Brak ciążących frameworków SPA, czysty HTML/CSS/JS.
- **Dostępność i SEO**: Pełne wsparcie WCAG AA, dane strukturalne JSON-LD `SoftwareApplication`, Open Graph, Twitter Cards, plik `llms.txt`, `robots.txt` oraz `sitemap.xml`.

## Struktura Katalogu
```text
landing-page/
├── index.html        # Semantyczna struktura HTML5 i sekcja hero z CTA
├── styles.css        # Autorski Design System, glassmorphism, motywy
├── app.js            # Logika symulatora skanowania EAN w czasie rzeczywistym
├── llms.txt          # Podsumowanie i metadane dla robotów i agentów AI
├── robots.txt        # Wskazówki dla robotów indeksujących
├── sitemap.xml       # Mapa strony dla wyszukiwarek
└── assets/           # Plik APK (AllergenGuard-1.0.apk) oraz screeny (screen1.webp - screen10.webp)
```

## Publikacja na GitHub Pages
1. Ustawienie zdalnego repozytorium:
   ```bash
   git remote set-url origin https://github.com/apkmasondev/AllergenGuard_apk.git
   git add .
   git commit -m "fix: update repo URL, download link to assets/AllergenGuard-1.0.apk and shorten screenshot filenames"
   git push origin main
   ```
2. W ustawieniach repozytorium GitHub (*Settings -> Pages*) wskaż gałąź `main` oraz folder `/ (root)` jako źródło publikacji.
