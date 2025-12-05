import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const body = await req.json();

  if (Array.isArray(body.texts)) {
    const { values, embeddings, usage } = await embedMany({
      model: google.textEmbeddingModel("gemini-embedding-001"),
      values: body.texts,
    });

    return Response.json({
      values,
      embeddings,
      usage,
      count: embeddings.length,
      dimensions: embeddings[0].length,
    });
  }

  const { value, embedding, usage } = await embed({
    model: google.textEmbeddingModel("gemini-embedding-001"),
    value: body.text,
  });

  return Response.json({
    value,
    embedding,
    usage,
    dimensions: embedding.length,
  });
}
