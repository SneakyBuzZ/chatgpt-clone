import { deleteChatSession } from "@/lib/actions/chat-session";
import { NextResponse } from "next/server";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(request: Request, context: Context) {
  const { id } = await context.params;

  try {
    await deleteChatSession(id);
    return new Response("Chat session deleted successfully", { status: 200 });
  } catch (error) {
    console.error(
      `Failed to delete chat session with id ${id}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return NextResponse.json(
      {
        error: `${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
