import { streamText } from "ai";
// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = streamText({
      // model: openai("gpt-4.1-nano"),
      model: google("gemini-2.5-flash-lite"),
      prompt,
    });

    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return Response.json({ error: "Failed to stream text" }, { status: 500 });
  }
}
