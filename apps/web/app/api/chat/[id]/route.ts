import { deleteChatSession } from "@/lib/actions/chat-session";

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
    return new Response("Internal Server Error", { status: 500 });
  }
}
