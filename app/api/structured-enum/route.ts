import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const result = await generateObject({
      model: google("gemini-2.5-flash-lite"),
      output: "enum",
      enum: ["positive", "neutral", "negative"],
      prompt: `Classify the sentiment in this text: "${text}"`,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error("Error generating sentiment:", error);
    return new Response("Failed to generate sentiment", { status: 500 });
  }
}
