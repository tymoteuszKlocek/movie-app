# 🎬 OMDb Movie App

Aplikacja do wyszukiwania filmów wykorzystująca OMDb API, zbudowana w Next.js 14 z TypeScript i Tailwind CSS.

## 🚀 Funkcjonalności

- **Wyszukiwanie filmów** - zaawansowane wyszukiwanie z filtrowaniem

- **Filtrowanie** - po roku premiery i typie (film, serial, odcinek)

- **Infinite scroll** - płynne ładowanie kolejnych wyników

- **Szczegóły filmu** - pełne informacje o wybranym tytule

- **Ulubione** - trwałe przechowywanie ulubionych filmów (localStorage)

- **Responsywność** - działa na wszystkich urządzeniach

- **Dostępność** - zgodność z WCAG 2.1

- **SEO** - optymalizacja pod wyszukiwarki

- **Obsługa błędów** - przyjazne komunikaty dla użytkownika

## 📋 Wymagania

- Node.js 18.x lub nowszy

- npm lub yarn

- Klucz API z [OMDb API](http://www.omdbapi.com/apikey.aspx)

## 🔧 Instalacja

1. Sklonuj repozytorium:

```bash
git clone <repository-url>
cd omdb-movie-app
```

1. Zainstaluj zależności:

```bash
npm install
```

1. Utwórz plik `.env.local` w głównym katalogu:

```bash
NEXT_PUBLIC_OMDB_API_KEY=twoj_klucz_api
```

1. Uruchom aplikację w trybie deweloperskim:

```bash
npm run dev
```

1. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 🏗️ Struktura projektu

```
omdb-movie-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Główny layout
│   │   ├── page.tsx           # Strona główna
│   │   ├── movie/[id]/        # Szczegóły filmu
│   │   └── favorites/         # Strona ulubionych
│   ├── components/            # Komponenty React
│   │   ├── SearchForm.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieList.tsx
│   │   ├── MovieDetails.tsx
│   │   └── FavoriteButton.tsx
│   ├── hooks/                 # Custom hooks
│   │   ├── useFavorites.ts
│   │   └── useMovieSearch.ts
│   ├── services/              # API services
│   │   └── omdb.ts
│   └── types/                 # TypeScript types
│       └── movie.ts
├── public/                    # Pliki statyczne
├── tests/                     # Testy jednostkowe
└── package.json
```

## 🛠️ Technologie

### Core

- **Next.js 14** - Framework React z App Router i SSR

- **React 18** - Biblioteka UI

- **TypeScript** - Typowanie statyczne

### Styling

- **Tailwind CSS** - Utility-first CSS framework

- **CSS Modules** - Scoped styles

### State Management & Data Fetching

- **React Hooks** - useState, useEffect, useCallback

- **localStorage** - Przechowywanie ulubionych

### Testing

- **Jest** - Framework testowy

- **React Testing Library** - Testowanie komponentów

### Inne

- **react-intersection-observer** - Infinite scroll

- **ESLint** - Linting kodu

## 📦 Zależności

### Dependencies

- `next` - Framework aplikacji

- `react` & `react-dom` - Biblioteka UI

- `react-intersection-observer` - Obsługa infinite scroll

### DevDependencies

- `typescript` - Kompilator TypeScript

- `tailwindcss` - Framework CSS

- `eslint` - Linter

- `jest` & `@testing-library/react` - Testowanie

- `autoprefixer` & `postcss` - Przetwarzanie CSS

## 🧪 Testowanie

Uruchom testy jednostkowe:

```bash
npm test
```

Tryb watch:

```bash
npm run test:watch
```

## 🌐 Deployment

### Vercel (zalecane)

```bash
npm run build
vercel deploy
```

### Inne platformy

```bash
npm run build
npm start
```

## 🎯 Funkcjonalności WCAG

- Semantyczny HTML (nav, main, article, section)

- Odpowiednie role ARIA

- Etykiety dla formularzy

- Kontrast kolorów zgodny z WCAG AA

- Nawigacja klawiaturą

- Alt text dla obrazów

- Focus indicators

## 🔍 Optymalizacja SEO

- Meta tagi (title, description)

- Open Graph tags

- Semantic HTML

- Server-side rendering (SSR)

- Dynamiczne meta tagi dla stron filmów

- Sitemap i robots.txt

## 📝 Notatki

- Klucz API OMDb jest darmowy z limitem 1000 requestów dziennie

- Ulubione są przechowywane lokalnie w localStorage

- Aplikacja używa infinite scroll zamiast klasycznej paginacji

- Obsługa błędów API z przyjaznymi komunikatami

## 🤝 Autor

Aplikacja stworzona jako zadanie rekrutacyjne.

## 📄 Licencja

MIT
