import { UIMessage, streamText, convertToModelMessages } from "ai";
// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      // model: openai("gpt-4.1-nano"),
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return Response.json(
      { error: "Failed to stream chat completion" },
      { status: 500 }
    );
  }
}
