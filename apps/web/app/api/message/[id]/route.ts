import {
  createMessage,
  getMessagesFromSession,
  updateMessage,
} from "@/lib/actions/message";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(req: NextRequest, context: Context) {
  const { id: chatSessionId } = await context.params;
  const { prompt, uploadedFiles, isEdit, messageId } = await req.json();

  if (!prompt || !chatSessionId) {
    return new NextResponse("Missing prompt or chatSessionId", { status: 400 });
  }

  if (isEdit) {
    if (!messageId) {
      return new NextResponse("Missing messageId for edit", { status: 400 });
    }
    return await updateMessage(prompt, messageId, chatSessionId);
  }

  return await createMessage(prompt, chatSessionId, uploadedFiles);
}

export async function GET(req: NextRequest, context: Context) {
  const { id: chatSessionId } = await context.params;

  if (!chatSessionId) {
    console.error("Missing chatSessionId in request parameters");
    return new NextResponse("Missing chatSessionId", { status: 400 });
  }

  try {
    const messages = await getMessagesFromSession(chatSessionId);

    return NextResponse.json({
      payload: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        error: `${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
