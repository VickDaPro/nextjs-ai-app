import { google as originalGoogle } from "@ai-sdk/google";
import { openai as originalOpenAI } from "@ai-sdk/openai";

import {
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
  createProviderRegistry,
} from "ai";

// google:smart
const customGoogle = customProvider({
  languageModels: {
    fast: originalGoogle("gemini-2.5-flash-lite"),
    smart: originalGoogle("gemini-2.5-flash"),
    reasoning: wrapLanguageModel({
      model: originalGoogle("gemini-2.5-pro"),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            google: {
              reasoningEffort: "high",
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: originalGoogle,
});

// openai:fast
const customOpenAI = customProvider({
  languageModels: {
    fast: originalOpenAI("gpt-5-nano"),
    smart: originalOpenAI("gpt-5-mini"),
    // reasoning: wrapLanguageModel({
    //   model: originalOpenAI("gpt-5-mini"),
    //   middleware: defaultSettingsMiddleware({
    //     settings: {
    //       providerOptions: {
    //         openai: {
    //           reasoningEffort: "high",
    //         },
    //       },
    //     },
    //   }),
    // }),
  },
  fallbackProvider: originalOpenAI,
});

export const registry = createProviderRegistry({
  google: customGoogle,
  openai: customOpenAI,
});
