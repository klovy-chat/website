# website

[![License: Klovy](https://img.shields.io/badge/License-Klovy-blue.svg)](LICENSE)

The official website of Klovy Chat.

Oficjalna strona komunikatora **Klovy Chat** — Next.js, TypeScript i Tailwind CSS.

Produkcja: [klovy.chat](https://klovy.chat)

---

## O projekcie

Strona marketingowa i informacyjna Klovy Chat: funkcje produktu, zespół, wsparcie, pobieranie aplikacji desktop oraz blog. Hostowana na Cloudflare (OpenNext).

Trasy: `/` (start), `/about`, `/team`, `/support`, `/download`, `/blog`.

### Ekosystem

| Repo | Rola |
|------|------|
| [backend](https://github.com/klovy-chat/backend) | API i WebSocket |
| [frontend](https://github.com/klovy-chat/frontend) | Aplikacja web (`app.klovy.chat`) |
| [website](https://github.com/klovy-chat/website) | Strona (`klovy.chat`) |
| [application](https://github.com/klovy-chat/application) | Desktop (Tauri) |

---

## Funkcje

- Landing z funkcjami produktu
- Blog (Markdown / MDX, opcjonalne tłumaczenia PL / EN)
- Pobieranie instalatorów desktop
- Strona zespołu i wsparcia
- i18n: polski i angielski
- Motyw jasny / ciemny

---

## Wymagania

- **Node.js** >= 18.x
- **npm** >= 9.x

---

## Uruchomienie lokalne

```bash
git clone https://github.com/klovy-chat/website.git
cd website
npm install
cp .env.example .env.local
```

`DISCORD_BOT_TOKEN` w [`.env.example`](.env.example) jest opcjonalny (avatary zespołu z Discord). Strona wstaje bez niego.

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

Produkcja (Cloudflare, utrzymujący):

```bash
npm run deploy
```

Nowy wpis na blogu:

```bash
npm run new-post -- nazwa-wpisu
```

Szczegóły: [content/blog/README.md](content/blog/README.md).

---

## Zmienne środowiska

Szablon: [`.env.example`](.env.example) (`cp .env.example .env.local`). Nie commituj `.env.local`.

| Zmienna | Opis |
|---------|------|
| `DISCORD_BOT_TOKEN` | Token bota Discord — avatary na stronie zespołu |

---

## Technologie

- **Next.js** — App Router (SSR / SSG)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — animacje
- **next-mdx-remote**, **react-markdown** — blog MDX and support content
- **OpenNext + Cloudflare Workers** — hosting
- **i18n** — PL / EN

---

## Struktura projektu

```
website/
├── app/                     # App Router (strony i layouty)
├── components/              # UI (MainPage, Blog, Team, Download, …)
├── content/
│   └── blog/                # Wpisy Markdown / MDX (en.md / en.mdx / pl.md / pl.mdx)
├── i18n/                    # Tłumaczenia
├── lib/                     # Blog, downloads, zespół
├── public/                  # Statyczne zasoby
├── scripts/                 # new-post, copy-windows-installer
├── wrangler.jsonc           # Cloudflare
├── next.config.ts
└── package.json
```

---

## Contributing

Kod jest publiczny na [Klovy License](LICENSE). Issue i pull requesty są mile widziane.

1. Zrób [fork](https://github.com/klovy-chat/website/fork)
2. Utwórz branch: `git checkout -b feature/opis-zmiany`
3. Commit (bez `.env.local` i sekretów)
4. Otwórz pull request do `main`

Opisz w PR **co** i **dlaczego**. Wpisy na blog i tłumaczenia też są OK.

Pomoc przy stronie: [ogzeyh](https://github.com/ogzeyh)

---

## Bezpieczeństwo

Luki zgłaszaj prywatnie przez [GitHub Security Advisories](https://github.com/klovy-chat/website/security/advisories/new). Nie otwieraj publicznego issue z exploitami.

---

## Licencja

Kod jest udostępniony na **[Klovy License](LICENSE)** — użycie osobiste, edukacyjne i niekomercyjne. Dystrybucja komercyjna, konkurencyjny komunikator oraz użycie marek Klovy wymagają pisemnej zgody Jakuba Maksymowicza. Zgłoszenie PR, błędu lub audytu bezpieczeństwa oznacza zgodę na warunki kontrybucji z licencji (pkt 7–11).

© 2026 [Jakub Maksymowicz](https://github.com/Klovy06)
