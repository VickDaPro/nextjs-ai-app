# Next.js + Vercel AI SDK v5 Playground

This repo is a minimal Next.js app that walks through the core primitives of the Vercel AI SDK v5—text generation, streaming, and chat—using both server routes and React hooks. It is wired to Google Gemini by default, with OpenAI ready to swap in.

## Requirements
- Node.js 18+ (Next.js 16)
- npm (uses `package-lock.json`)
- API key for one or more providers:
  - `GOOGLE_GENERATIVE_AI_API_KEY` for `@ai-sdk/google`
  - `OPENAI_API_KEY` for `@ai-sdk/openai` (optional swap)

## Setup
1) Install deps: `npm install`  
2) Create `.env.local` with your key(s):
```
GOOGLE_GENERATIVE_AI_API_KEY=your-key
# OPENAI_API_KEY=your-key
```
3) Run the dev server: `npm run dev` then open http://localhost:3000  
4) Visit the demo pages:
- `/ui/completion` – one-shot completion (manual fetch)
- `/ui/stream` – streaming completion via `useCompletion`
- `/ui/chat` – multi-turn chat via `useChat`

## Project Map
- `app/api/completion/route.ts` – `generateText` for non-streaming responses.
- `app/api/stream/route.ts` – `streamText` streaming responses; logs token usage.
- `app/api/chat/route.ts` – chat streaming with `UIMessage` + `convertToModelMessages` + `toUIMessageStreamResponse`.
- `app/ui/completion/page.tsx` – basic fetch to the completion API.
- `app/ui/stream/page.tsx` – `useCompletion` hook: input state, streaming output, stop control.
- `app/ui/chat/page.tsx` – `useChat` hook: message history, streaming UI parts, stop control.
- `app/page.tsx` – starter landing page (replace as desired).

## Vercel AI SDK v5 Fundamentals (shown in this repo)
- **Providers**: Import the provider package (`@ai-sdk/google`, `@ai-sdk/openai`) and pass a model id (e.g., `google("gemini-2.5-flash-lite")` or `openai("gpt-4.1-nano")`). Swap by changing the `model` line in the route handlers.
- **Text generation**: Use `generateText` for single responses; returns `{ text }`. Ideal for short, non-streaming tasks.
- **Streaming**: Use `streamText` for incremental tokens and usage. Return `result.toAIStreamResponse()` or `result.toUIMessageStreamResponse()` so the client hooks can consume the SSE stream.
- **Chat format**: Client hooks emit `UIMessage` objects; `convertToModelMessages` adapts them to provider-specific roles and content.
- **React hooks**: `useCompletion` and `useChat` manage input state, streaming updates, status flags, and `stop()` to abort streams. Point them to the correct API route via `api`.
- **Usage telemetry**: `result.usage` resolves with input/output token counts for logging/observability.
- **Error handling**: Server routes wrap calls in `try/catch` and return JSON errors; clients surface `error.message` in the UI.

## Commands
- `npm run dev` – start Next.js in dev mode.
- `npm run build` – production build.
- `npm start` – run the built app.
- `npm run lint` – lint with ESLint.

## Switching Models or Providers
- Comment/uncomment the provider import and `model` line in each route (`app/api/*/route.ts`).
- Ensure the matching API key is present in `.env.local`.
- Restart `npm run dev` after env changes.

## Deployment Notes
- Environment variables must be configured in your hosting platform.
- The app uses Next.js App Router route handlers; no custom server needed.
- Tailwind CSS (v4) is included via PostCSS and global styles.

## Further Reading
- Vercel AI SDK v5 docs: https://sdk.vercel.ai/docs
- Provider docs:
  - Google: https://sdk.vercel.ai/providers/ai-sdk-providers/ai-sdk-google
  - OpenAI: https://sdk.vercel.ai/providers/ai-sdk-providers/ai-sdk-openai
