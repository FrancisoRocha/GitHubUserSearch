# GitHub User Search App

![Design preview for the GitHub user search app coding challenge](./preview.jpg)

## Overview

A **GitHub user search app** built as part of a [Frontend Mentor](https://www.frontendmentor.io) challenge. Users can search any GitHub username and instantly see their public profile information — repos, followers, bio, links, and more. The app adapts to the user's system theme preference and allows manual toggling between light and dark mode.

### Live Demo

> _Add your live URL here once deployed._

---

## Features

- Search GitHub users by username using the [GitHub Users API](https://docs.github.com/en/rest/reference/users#get-a-user)
- Display user profile: avatar, name, username, join date, bio, repos, followers, following, location, Twitter, blog, and company
- Animated loading state (gradient border) while fetching data
- Graceful error handling for 404 (not found), 403 (rate limit), 500, and network errors
- "Not available" fallback for missing profile fields
- Light / Dark theme toggle with:
  - System preference detection (`prefers-color-scheme`)
  - Persistence across sessions via `localStorage`
- Fully responsive layout

---

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Flexbox, responsive design
- **JavaScript (ES Modules)** — Vanilla JS, Fetch API, async/await

No frameworks or build tools — runs directly in the browser.

---

## Project Structure

```
starter-code/
├── index.html
├── assets/
│   ├── dark/          # SVG icons for dark theme
│   ├── light/         # SVG icons for light theme
│   ├── icon-search.svg
│   ├── bitmap.png
│   └── favicon-32x32.png
├── styles/
│   ├── main.css       # Entry point — imports all stylesheets
│   ├── reset.css      # CSS reset
│   ├── variables.css  # Design tokens (colors, fonts)
│   ├── theme.css      # Light/dark theme color variables
│   ├── layout.css     # Page layout
│   └── components.css # UI component styles
└── js/
    ├── app.js         # Entry point — initializes modules, handles form submit
    ├── api.js         # GitHub API calls and error handling
    ├── ui.js          # DOM rendering (displayUser, displayError)
    └── theme.js       # Theme detection, application, and toggle
```

---

## JavaScript Architecture

The app is split into four ES modules with clear responsibilities:

| Module | Responsibility |
|--------|---------------|
| `app.js` | Bootstraps the app, wires up form submit event |
| `api.js` | Fetches data from GitHub API, returns typed error objects |
| `ui.js` | Renders user data or error messages into the DOM |
| `theme.js` | Reads/writes theme preference, updates icons and button |

### Data flow

```
User submits form
  → app.js calls api.js (getUser)
    → api.js returns user data or { error: { title, message } }
  → app.js calls ui.js (displayUser or displayError)
    → ui.js updates .header__info innerHTML
```

---

## CSS Architecture

Styles are organized by responsibility and imported through `main.css`:

- **`variables.css`** — Raw design tokens (neutral palette, blue, red, font family)
- **`theme.css`** — Light and dark theme color overrides using `[data-theme]` attribute selectors
- **`layout.css`** — Structural layout (container, header, search bar, profile section)
- **`components.css`** — Detailed component styles (stats bar, links, loading animation, error state)

Theme switching works by setting `data-theme="dark"` or `data-theme="light"` on `<html>`, which activates the matching CSS variable set.

---

## Running the Project

No install or build step needed. Just open `starter-code/index.html` in your browser, or use a local server:

```bash
# Using VS Code Live Server, or:
npx serve starter-code
```

---

## What I Learned

- Structuring a vanilla JS app with ES Modules for clean separation of concerns
- Using the Fetch API with `async/await` and handling different HTTP error codes
- Implementing dark/light theme with CSS custom properties and `data-theme` attributes
- Detecting and persisting user theme preferences with `prefers-color-scheme` and `localStorage`
- Rendering dynamic HTML safely with template literals
- Handling optional API fields gracefully in the UI

---

## Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6).
