import { streamObject } from "ai";
import { google } from "@ai-sdk/google";

import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    const result = streamObject({
      model: google("gemini-2.5-flash-lite"),
      output: "array",
      schema: pokemonSchema,
      prompt: `Generate a list of 5 ${type} type Pokémon.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating Pokémon list:", error);
    return new Response("Failed to generate Pokémon list", { status: 500 });
  }
}
