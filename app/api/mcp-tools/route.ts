import {
  UIMessage,
  InferUITools,
  UIDataTypes,
  streamText,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";

import { experimental_createMCPClient as createMcpClient } from "@ai-sdk/mcp";

// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const tools = {
  getWeather: tool({
    description: "Get the weather for a location",
    inputSchema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
    execute: async ({ city }) => {
      if (city === "Gotham City") {
        return "70°F and cloudy";
      } else if (city === "Metropolis") {
        return "80°F and sunny";
      } else {
        return "unknown";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const httpTransport = new StreamableHTTPClientTransport(
      new URL("https://app.mockmcp.com/servers/ixo81XlV7UfP/mcp"),
      {
        requestInit: {
          headers: {
            Authorization:
              "Bearer mcp_m2m_vblGfra44d0nhNBeWY_mHnU6KXRyOKOBo3y8hB4aKTM_0cbed053b29e55c9",
          },
        },
      }
    );

    const mcpClient = await createMcpClient({
      transport: httpTransport,
    });

    const mcpTools = await mcpClient.tools();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      // model: openai("gpt-4.1-nano"),
      messages: convertToModelMessages(messages),
      tools: { ...mcpTools, ...tools },
      stopWhen: stepCountIs(2),
      onFinish: async () => {
        await mcpClient.close();
      },
      onError: async (error) => {
        await mcpClient.close();
        console.error("Error during streaming", error);
      },
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
