# AI Value Quest

An executive decision simulator for building an AI investment case that connects a business problem to an AI capability, human role, value outcome, KPI, baseline, target, and evidence.

## Run locally

```sh
npm install
npm run dev
```

## Deploy to GitHub Pages

The GitHub Actions workflow builds and deploys the game to GitHub Pages whenever
changes are pushed to `main`. Create a public repository named `ai-value-quest`,
push this project to its `main` branch, then select **Settings → Pages → GitHub
Actions** as the deployment source. The published game will be available at
`https://<your-github-username>.github.io/ai-value-quest/`.

## Play

Choose one of four executive missions, select the AI job and human role, place a single value bet, and define the KPI, baseline, target, and evidence source. A randomized boardroom shock then tests the case. Respond to it, optionally revise the proof, and review the scored investment thesis and debrief questions.

The game runs entirely in the browser. Mission content, decisions, and scoring are local TypeScript data and client-side state; no backend or external API is used.
