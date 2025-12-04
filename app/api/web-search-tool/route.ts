import {
  UIMessage,
  InferUITools,
  UIDataTypes,
  streamText,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

const tools = {
  //   web_search_preview: openai.tools.webSearchPreview({}),
  web_search_preview: google.tools.googleSearch({}),
};

// We need to use openai or anthropic models to see the sources tab. They dont work with google gemini 2.5 flash.

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      //   model: openai("gpt-5-mini"),
      messages: convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse({
      sendSources: true,
    });
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return Response.json(
      { error: "Failed to stream chat completion" },
      { status: 500 }
    );
  }
}
