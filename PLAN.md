# Tudengibaar Bingo — Build Plan

Brief for Claude Code (use with the `ui-ux-pro-max` skill for design) to build the site.

## 1. Event context

- **Event:** Tudengibaar, a bar-exchange ("börsibaar") style student party where drink prices change with demand. Organized by ITÜK (IT-teaduskonna üliõpilaskogu) together with Inseneriteaduskonna üliõpilaskogu.
- **Edition:** "Börsibaar X Kosmos". The theme is **space**.
- **When/where:** 4. detsember 2026, 23:00, IT Kolledž (TalTech, Tallinn).
- **Poster look:** black chalkboard/grunge background, a grayscale UFO with drink glasses (wine, martini, whiskey, shot) with a **neon-green glow outline**, a white hand-drawn brush/graffiti "TUDENGIBAAR" wordmark, and bold geometric sans text (white, plus neon green for the date). Faculty logos sit bottom-left.

## 2. Product summary

A mobile-only web bingo. Each attendee gets a **3×3 card** of tasks. To complete a task you must **obtain a secret code**, either by doing something or by finding it (e.g. "Say the code word *zip zap zup* to the Alien mascot and he'll reveal the code"), and then **enter the code** on that square. There are no prizes; it's just for fun.

## 3. Functional requirements

### Card
- 9 squares, each with: `id`, title (ET + EN), task description (ET + EN), and a SHA-256 hash of the code.
- **Content for now:** 9 placeholder squares ("Ülesanne 1…9" / "Task 1…9"). For testing, **every square accepts the code `win`**. Replace before the event.
- **Order is shuffled per device** on first visit, and that order is saved, so it stays stable across reloads.

### Entering a code
- Tap a square to open a sheet/modal showing the task description, a code input, and a submit button.
- **Matching is forgiving:** trim, collapse inner whitespace, lowercase. Keep õ/ä/ö/ü as typed (no diacritic stripping).
- Normalized input → SHA-256 (Web Crypto `crypto.subtle.digest`) → compared to the square's hash.
- Correct: the square flips to "done" with a neon stamp/animation. Wrong: shake plus an error message. No lockout.
- Completed squares can't be un-completed.

### Wins (celebration only, no real prizes)
- Rows and columns do **not** count. Win patterns, each celebrated once with its own animation plus a "BINGO!" toast:
  - **Each diagonal** (2): a neon beam is drawn corner to corner while a UFO flies along it.
  - **4 corners:** rings burst out of each corner square in turn.
  - **Full card (9/9):** full-screen takeover; afterwards the card stays visibly "completed".
- If one tap completes several patterns, their celebrations queue one after another.
- A disclaimer that wins are just for fun, with no material rewards, is always visible under the how-to link.

### Persistence (no backend)
- Save to `localStorage` under one versioned key, `tudengibaar-bingo:v2`: `{ order: [...ids], completed: [...ids], celebrated: ["diag-main"|"diag-anti"|"corners"|"full"], lang: "et"|"en" }`.
- Restore on load, so a refresh or tab close doesn't lose progress (same device and browser).
- Wrap all storage access in try/catch so the app still works if storage is blocked.
- If the stored square ids no longer match the config (content changed), reconcile: drop unknown ids and append new ones.
- Optional: a hidden "reset card" behind a confirm dialog (useful for testing).

### Language
- Estonian by default, with an **ET/EN toggle** in the header. The choice persists.
- Keep all strings in `src/i18n.js` (no i18n library needed).

### Layout (one phone screen, no scroll)
- The page is only the game: no poster, no date or location (players have seen those already).
- Top bar: "Börsibaar X Kosmos" + ET/EN toggle. Title "TUDENGIBAAR BINGO".
- "How to play?" link that opens the instructions as a panel over the card; the disclaimer sits under it.
- The 3×3 squares sit inside a framed **bingo card** (neon outline) that takes all remaining height.
- Progress bar (`3/9`, "Card complete!" when full) **below** the card.
- Thin footer strip: small faculty logos + reset.

## 4. Anti-cheat (light)
- Only **hashes** ship in the bundle, never plain codes.
- Add a helper script, `npm run hash -- "zip zap zup"`, that applies the same normalization and prints the hash. Organizers use it when adding squares.
- Accepted limitation: short codes can be brute-forced. That's fine for a party game.

## 5. Tech stack
- Existing scaffold: **Vite 8 + React 19, JavaScript** (in `tudengibaar-bingo/`).
- Add **Tailwind CSS**. Check current Vite setup docs via Context7 (`@tailwindcss/vite`).
- No router and no backend. State lives in a `useBingo` hook (reducer plus localStorage sync).
- Suggested structure:
  ```
  src/
    data/squares.js        # square config (texts + hashes)
    i18n.js
    lib/hash.js            # normalize + sha256
    lib/storage.js         # load/save/reconcile
    lib/lines.js           # win line detection
    hooks/useBingo.js
    components/Header.jsx, BingoGrid.jsx, Square.jsx,
               CodeSheet.jsx, Celebration.jsx, LangToggle.jsx, Footer.jsx
  scripts/hash-code.js
  ```

## 6. Design direction (for ui-ux-pro-max)
- **Mobile-first only.** Target 360–430px width, touch targets of at least 44px, and comfortable one-thumb use. Use a centered max-width column on desktop.
- **Palette:** near-black chalk texture background, white text, a **neon green accent with glow** (sample the exact hex from the poster), and grayscale imagery.
- **Typography:** a brush/graffiti display font for the "TUDENGIBAAR" feel (or use the poster wordmark image), plus a bold geometric sans like the poster's for the UI. Fonts must support Estonian characters (õ ä ö ü š ž).
- **Space motifs:** UFO, stars, subtle parallax star field, alien. Completed squares get a neon-green glowing stamp.
- Respect `prefers-reduced-motion` for all animations.
- Check contrast, especially neon green on black for small text.

## 7. Assets
- User provides: **poster/UFO image** and **faculty logos** (IT-teaduskonna üliõpilaskogu, Inseneriteaduskonna üliõpilaskogu). Put them in `tudengibaar-bingo/src/assets/`.
- An alien mascot image may come later from the user. Until then, use a simple placeholder (SVG/emoji).
- User will add more assets themselves later, so keep asset references centralized.

## 8. Deployment: GitHub Pages
- Repo: `hurtmartin/tudengibaar-bingo`, URL `https://hurtmartin.github.io/tudengibaar-bingo/`.
- `vite.config.js`: `base: '/tudengibaar-bingo/'`.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) that runs `npm ci && npm run build` in `tudengibaar-bingo/` and deploys `dist/` with `actions/deploy-pages`.
- Pages is HTTPS, so `crypto.subtle` works (it also works on localhost in dev).
- Optional: generate a QR code pointing to the URL, for posters and tables.

## 9. Acceptance checklist
- [ ] Card shows 9 squares in a per-device random order, and the order survives reload.
- [ ] Entering `win` (or `  WIN `) on any square completes it; wrong codes shake.
- [ ] Progress survives refresh and tab close.
- [ ] Each diagonal, the four corners and the full card each celebrate once; rows/columns don't.
- [ ] ET/EN toggle switches all text and persists.
- [ ] No plain codes appear in the built bundle (`grep` the `dist/` output).
- [ ] Looks right at 360px and 430px widths, and reduced motion is respected.
- [ ] Deployed and working on GitHub Pages.

## 10. Open items (decide later)
- Real task texts and codes for squares 1–8.
- Alien mascot art.
- Exact fonts (pick ones that match the poster and are licensed for web use).
