# Pythagorean Numerology Report Generator

A modern, responsive, and privacy-focused Pythagorean Numerology web application
built with **Deno Fresh 2.x**, **Preact**, **Vite**, **Tailwind CSS v4**, and
**jsPDF**.

Unveil your core vibrational blueprints, calculate your Life Path, Destiny, and
Soul Urge numbers, analyze your 3×3 Planes of Expression matrix, and download a
styled multi-page PDF report.

---

## ✨ Features

- **Core Number Calculations:**
  - **Life Path Number:** Life purpose, innate gifts, and primary mission.
  - **Personality Number:** Derived from the day of birth; individual
    personality traits.
  - **Destiny (Expression) Number:** Sum of all letters in the full birth name.
  - **Soul Desire (Heart's Desire) Number:** Sum of all vowels in the name.
  - **Outer Personality Number:** Sum of all consonants in the name.
  - **Personal Year Cycle:** Annual forecast based on birth date and target
    year.
- **Master Number Preservation:**
  - Full support for Master Numbers (**11**, **22**, **33**) with badge
    highlights and dual root representation (e.g., `11/2`).
- **Pythagorean 3×3 Grid & Planes of Expression:**
  - **Mind Plane (3, 6, 9):** Thought, memory, analysis, and creative ideation.
  - **Soul Plane (2, 5, 8):** Intuition, feelings, spiritual sensitivity, and
    empathy.
  - **Physical Plane (1, 4, 7):** Practicality, manual skills, craftsmanship,
    and grounding.
- **Analytical Energy Indicators:**
  - **Masculine (1s) vs. Feminine (2s) Balance:** Interactive gauge displaying
    dominant or balanced energy.
  - **Old Soul Indicator:** Triggered when 5 or more nines appear, displaying
    lifetime reincarnation count.
  - **Intensity Interpretations:** Detailed meanings for repeated number counts
    (1, 11, 111, 1111, Many).
  - **Karmic Lessons:** Actionable growth guidance for numbers missing from the
    chart (1–9).
- **Report Export Options:**
  - **PDF Export:** Vector-drawn 3×3 grid, letter breakdown table, and full
    multi-page report using `jspdf`.
  - **Native Print Layout:** Clean `@media print` CSS layout for browser "Save
    as PDF" or physical printing.
- **Privacy & Offline First:**
  - **100% Client-Side:** All calculations and document exports happen entirely
    in the browser.
  - **Zero Telemetry:** No user data or birth information is ever stored or
    transmitted over the network.

---

## 🛠️ Tech Stack

- **Runtime:** [Deno](https://deno.com/)
- **Framework:** [Fresh 2.3.3](https://fresh.deno.dev/)
- **Bundler:** [Vite 7](https://vitejs.dev/)
- **UI Library:** [Preact](https://preactjs.com/) (Signals & Hooks)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF)

---

## 🚀 Getting Started

### Prerequisites

Make sure [Deno](https://docs.deno.com/runtime/getting_started/installation) is
installed:

```bash
# macOS / Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex
```

### Development

Clone the repository and run the local development server:

```bash
# Start development server with HMR
deno task dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Testing & Hygiene

Run unit tests and code checks:

```bash
# Run unit tests
deno test -A

# Run format check, linter, and type check
deno task check

# Auto-format codebase
deno fmt
```

### Production Build & Serve

```bash
# Build client and SSR bundles
deno task build

# Start production server
deno task start
# Or specify a port:
deno serve --port 8000 -A _fresh/server.js
```

---

## 📁 Project Structure

```
.
├── assets/
│   └── styles.css             # Tailwind CSS & print media queries
├── islands/
│   └── NumerologyForm.tsx     # Interactive Preact island (inputs, tabs, 3x3 grid, PDF export)
├── routes/
│   ├── _app.tsx               # Root HTML document layout & metadata
│   └── index.tsx              # Page shell & application header
├── utils/
│   ├── numerology.ts          # Core Pythagorean engine, reductions, planes & interpretations
│   ├── numerology_test.ts     # Automated unit test suite
│   └── pdf_export.ts          # Multi-page jsPDF document generator
├── static/                    # Favicon and static assets
├── deno.json                  # Deno configuration, tasks, and imports
├── vite.config.ts             # Vite configuration with Fresh & Tailwind plugins
├── LICENSE                    # MIT License
└── README.md
```

---

## 📜 License

Distributed under the [MIT License](LICENSE).
