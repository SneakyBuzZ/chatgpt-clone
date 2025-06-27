import { getChatSessions } from "@/lib/actions/chat-session";
import { NextRequest, NextResponse } from "next/server";

const { createChatSession } = await import("@/lib/actions/chat-session");

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    await createChatSession(prompt);
    return NextResponse.json(
      { message: "Chat session created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      `Failed to handle POST request: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const chatSessions = await getChatSessions();
    if (!chatSessions) {
      return NextResponse.json(
        { error: "Something went wrong while getting sessions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ payload: chatSessions }, { status: 200 });
  } catch (error) {
    console.error(
      `Failed to handle GET request: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
