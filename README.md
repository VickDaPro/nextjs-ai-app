# Next.js + Vercel AI SDK v5 Playground

This repo is a minimal Next.js app that walks through the core primitives of the Vercel AI SDK v5—text generation, streaming, and chat—using both server routes and React hooks. It is wired to Google Gemini by default, with OpenAI ready to swap in.

## Requirements

- Node.js 18+ (Next.js 16)
- npm (uses `package-lock.json`)
- API key for one or more providers:
  - `GOOGLE_GENERATIVE_AI_API_KEY` for `@ai-sdk/google`
  - `OPENAI_API_KEY` for `@ai-sdk/openai` (optional swap)

## Setup

1. Install deps: `npm install`
2. Create `.env.local` with your key(s):

```
GOOGLE_GENERATIVE_AI_API_KEY=your-key
# OPENAI_API_KEY=your-key
```

3. Run the dev server: `npm run dev` then open http://localhost:3000

````markdown
# Next.js AI Playground (Vercel AI SDK v5)

This repository demonstrates a set of Next.js App Router examples and UI demos built on top of the Vercel AI SDK v5. It includes server route handlers (API) and client pages that showcase text generation, streaming, chat, embeddings, image generation, speech, structured data, and a number of utility tooling examples.

**Quick note:** the project is wired to a provider by default (Google Gemini in examples) but is provider-agnostic — you can swap in OpenAI or other supported providers by changing the provider import and model id in the route handlers.

**Requirements**

- Node.js 18+ (recommended)
- npm (this repo uses `package-lock.json`)
- Provider API key(s) in `.env.local` (see the env section below)

**Setup**

1. Install dependencies:

```bash
npm install
```
````

2. Create `.env.local` with the provider keys you want to use. Example:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-google-key
# OPENAI_API_KEY=your-openai-key
```

3. Start dev server and open the app:

```bash
npm run dev
# then open http://localhost:3000
```

**Project structure & available demos**

- **API route handlers** (server-side):

  - `app/api/completion/route.ts` — non-streaming text generation
  - `app/api/stream/route.ts` — streaming text responses
  - `app/api/chat/route.ts` — multi-turn chat stream helpers
  - `app/api/embeddings/route.ts` — embeddings demo
  - `app/api/generate-image/route.ts` — image generation
  - `app/api/generate-speech/route.ts` — text-to-speech generation
  - `app/api/transcribe-audio/route.ts` — audio transcription
  - `app/api/semantic-search/route.ts` — semantic search example
  - `app/api/reasoning/route.ts` — reasoning / chain-of-thought examples
  - `app/api/web-search-tool/route.ts` — simple web-search tool wrapper
  - `app/api/tools/route.ts`, `app/api/multiple-tools/route.ts`, `app/api/client-side-tools/route.ts`, `app/api/api-tool/route.ts`, `app/api/mcp-tools/route.ts` — assorted tooling examples
  - `app/api/provider-management/route.ts` — provider selection helpers
  - `app/api/structured-data/route.ts`, `app/api/structured-array/route.ts`, `app/api/structured-enum/route.ts` — structured outputs and schema-driven demos
  - `app/api/message-metadata/route.ts` — message metadata utilities

- **Client UI pages** (under `app/ui`):
  - `app/ui/completion/page.tsx` — one-shot completion demo
  - `app/ui/stream/page.tsx` — streaming completion UI with `useCompletion`
  - `app/ui/chat/page.tsx` — multi-turn chat UI with `useChat`
  - `app/ui/embeddings` / `app/ui/semantic-search` pages — embeddings & semantic search demos
  - `app/ui/generate-image/page.tsx`, `app/ui/generate-image-tool/page.tsx` — image generation demos
  - `app/ui/generate-speech/page.tsx` — TTS demo
  - `app/ui/transcribe-audio/page.tsx` — speech-to-text demo
  - `app/ui/multi-modal-chat/page.tsx` — multimodal chat demo
  - `app/ui/tools/page.tsx`, `app/ui/multiple-tools/page.tsx`, `app/ui/client-side-tools/page.tsx`, `app/ui/api-tool/page.tsx`, `app/ui/mcp-tools/page.tsx` — assorted tool UIs
  - `app/ui/structured-data/page.tsx`, `app/ui/structured-array/page.tsx`, `app/ui/structured-enum/page.tsx` — structured output UIs
  - `app/ui/message-metadata/page.tsx`, `app/ui/provider-management/page.tsx`, `app/ui/web-search-tool/page.tsx`, `app/ui/reasoning/page.tsx` — additional demos and utilities

Explore `/app/ui` in the browser to see each demo in action.

**Key concepts demonstrated**

- Providers: swap provider imports (e.g. `@ai-sdk/google`, `@ai-sdk/openai`) and model ids in route handlers to change backends.
- Text generation vs streaming: examples show `generateText` (single response) and `streamText` (incremental tokens / SSE).
- Chat: client-side `UIMessage` objects are converted to provider messages via `convertToModelMessages` and streamed back to the UI with `toUIMessageStreamResponse()` where appropriate.
- React hooks: `useCompletion` and `useChat` (used by client pages) handle input state, streaming updates, and `stop()` controls.
- Structured data: schema-driven outputs and typed responses are demonstrated in the structured pages.

**Environment variables**

- `GOOGLE_GENERATIVE_AI_API_KEY` — for Google provider examples.
- `OPENAI_API_KEY` — for OpenAI examples (if used).
  Add any other provider-specific keys required by the routes you enable.

**Scripts**

- `npm run dev` — start Next.js in development mode
- `npm run build` — production build
- `npm start` — run the built app
- `npm run lint` — run ESLint

**Switching providers / models**

- Edit the provider import and `model(...)` line in the specific `app/api/*/route.ts` file you want to change, add the required env var to `.env.local`, then restart the dev server.

**Deployment notes**

- Configure environment variables in your hosting platform (Vercel, Netlify, etc.).
- This app uses Next.js App Router route handlers; no custom server is required.

**Further reading**

- Vercel AI SDK v5 docs: https://sdk.vercel.ai/docs

```

```
