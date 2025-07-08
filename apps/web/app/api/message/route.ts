import { createMessage, updateMessage } from "@/lib/actions/message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, uploadedFiles, isEdit, messageId, chatSessionId } =
    await req.json();

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
