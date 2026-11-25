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
app/page.js              the explorer (main dashboard)
app/fingerprint/page.js  the My Taste fingerprint page
app/globals.css          all styling (dark theme tokens at the top)
components/Dashboard.jsx explorer: inputs, hexagon, tasting notes, breakdown, Save button
components/Fingerprint.jsx saved profiles and the combined fingerprint
components/Hex.jsx       shared hexagon chart
components/Nav.jsx       brand and page navigation
lib/data.js              the flavour index data: origins, varietals, processes, roasts, notes
lib/model.js             scoring logic: compute(state) -> axes, hexagon traits, notes
lib/fingerprint.js       combines saved profiles (mean traits, summed note weights)
lib/store.js             saved profiles in the browser's localStorage
```

## Tuning the model
Everything numeric lives in `lib/data.js` (per-choice values on a 0–10 scale) and `lib/model.js` (formulas).
Each varietal and process carries an evidence tag: `b` book, `m` book + outside, `x` outside.
