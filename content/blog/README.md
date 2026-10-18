# Blog — jak dodać wpis

Każdy wpis to folder w `content/blog/`. Wpis może mieć jeden plik źródłowy `.md` lub `.mdx`; tłumaczenia są opcjonalnymi plikami o nazwie języka (`en` lub `pl`).

## Szybki start

```bash
npm run new-post -- nazwa-wpisu
```

Przykład:

```bash
npm run new-post -- aktualizacja-beta
```

To utworzy `content/blog/aktualizacja-beta/en.mdx` z przykładowym frontmatter i treścią.

## Ręczne dodawanie

1. Utwórz folder `content/blog/twoj-slug/`
2. Dodaj plik źródłowy, np. `en.md` albo `en.mdx`
3. (Opcjonalnie) dodaj tłumaczenie jako `pl.md` lub `pl.mdx`
4. Slug = nazwa folderu → URL: `/blog/twoj-slug`

Można też napisać wpis po polsku jako `pl.md` / `pl.mdx`. Jeśli dla wybranego języka nie ma pliku, strona wyświetli dostępny wpis źródłowy i poinformuje czytelnika, że tłumaczenie nie jest dostępne. Tłumaczenia nie są generowane automatycznie — przygotowujemy i zapisujemy je jako osobne pliki, bez wysyłania treści do zewnętrznego API.

Gdy dla jednego języka istnieją oba rozszerzenia, używany jest plik `.mdx`.

## Frontmatter (nagłówek pliku)

```yaml
---
title: "Tytuł wpisu"
description: "Opis na liście bloga"
publishedAt: "2026-10-18"
author: "Imię i nazwisko autora"
image: "/blog/twoj-slug.webp"
tags: ["Klovy Chat", "Aktualizacja"]
readingTime: "5 min"
---
```

Pola `publishedAt` i `author` są opcjonalne; data używa formatu `YYYY-MM-DD`. Data i autor pojawią się na karcie wpisu. Poniżej frontmatter pisz treść w Markdown. Pliki `.mdx` obsługują dodatkowo JSX w treści, np. semantyczne elementy HTML. Markdown i MDX są kompilowane do HTML podczas builda, a nie na Workerze.

## Obrazek

Opcjonalnie dodaj miniaturę do `public/blog/twoj-slug.webp` i ustaw `image` w frontmatter.

## Publikacja

Po zapisaniu plików wypchnij zmiany na GitHub. Cloudflare zbuduje stronę ponownie i nowy wpis pojawi się na klovy.chat/blog.

> Wpisy są wczytywane podczas przygotowania builda — po dodaniu pliku `.md` lub `.mdx` potrzebny jest nowy build i redeploy. Skrypty `dev`, `build` i `lint` automatycznie generują moduł z treścią bloga, dzięki czemu wpisy działają również na Cloudflare Workers.
