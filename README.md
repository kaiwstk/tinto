# Coffee Flavour Index (TINTO)

Predicts a coffee's taste from origin, varietal, processing, roast level and altitude.
Reference data comes from *The World Atlas of Coffee*; gaps are filled from outside sources and tagged in the UI.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New → Project**, import the repo, and keep the detected **Next.js** preset.
3. Click **Deploy**. No environment variables are needed.

## Structure
```
app/layout.js            fonts, metadata, viewport
app/page.js              renders the dashboard
app/globals.css          all styling (dark theme tokens at the top)
components/Dashboard.jsx inputs, hexagon, tasting notes, breakdown table
lib/data.js              the flavour index data: origins, varietals, processes, roasts, notes
lib/model.js             scoring logic: compute(state) -> axes, hexagon traits, notes
```

## Tuning the model
Everything numeric lives in `lib/data.js` (per-choice values on a 0–10 scale) and `lib/model.js` (formulas).
Each varietal and process carries an evidence tag: `b` book, `m` book + outside, `x` outside.
