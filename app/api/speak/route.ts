import { Message } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = req.url;
  const model = req.nextUrl.searchParams.get("model") ?? "eleven_multilingual_v2";
  const message: Message = await req.json();
  const start = Date.now();

  let text = message.content;

  text = text
    .replaceAll("¡", "")
    .replaceAll("https://", "")
    .replaceAll("http://", "")
    .replaceAll(".com", " dot com")
    .replaceAll(".org", " dot org")
    .replaceAll(".co.uk", " dot co dot UK")
    .replaceAll(/```[\s\S]*?```/g, "\nAs shown on the app.\n")
    .replaceAll(
      /([a-zA-Z0-9])\/([a-zA-Z0-9])/g,
      (match, precedingText, followingText) => {
        return precedingText + " forward slash " + followingText;
      }
    );

  return await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/sKo69RARb09ntxuL09ux/stream?optimize_streaming_latency=3`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_turbo_v2',
     
      }),
    }
  ).then(async (response) => {
    const headers = new Headers();
    headers.set("X-DG-Latency", `${Date.now() - start}`);
    headers.set("Content-Type", "audio/mpeg");

    if (!response?.body) {
      return new NextResponse("Unable to get response from API.", {
        status: 500,
      });
    }

    return new NextResponse(response.body, { headers });
  })
  .catch((error: any) => {
    return new NextResponse(error || error?.message, { status: 500 });
  });
}