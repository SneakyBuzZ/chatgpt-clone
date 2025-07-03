import { streamText } from "ai";
import { db } from "@chatgpt/prisma/src/client";
import { createDataStreamResponse } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "@chatgpt/ai";
import useFileStore from "../store/file-store";

export const createMessage = async (prompt: string, chatSessionId: string) => {
  const { uploadedFiles } = useFileStore.getState();

  const { id: messageId } = await db.message.create({
    data: {
      content: prompt,
      role: "user",
      chatSessionId,
    },
    select: {
      id: true,
    },
  });

  console.log("BEFORING STORING FILES: ", uploadedFiles.length);

  if (uploadedFiles.length > 0) {
    await db.file.createMany({
      data: uploadedFiles.map((file) => ({
        id: file.id,
        url: file.url,
        type: file.type,
        format: file.format,
        messageId,
      })),
    });
  }

  console.log("FILE HAI NA ? ", uploadedFiles.length);

  const messages = await db.message.findMany({
    where: { chatSessionId },
    orderBy: { createdAt: "asc" },
  });

  const history = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: google("gemini-1.5-flash"),
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        onFinish: async ({ text }) => {
          await db.message.create({
            data: {
              chatSessionId,
              role: "assistant",
              content: text,
            },
          });
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      console.error(
        "Error in createMessage action:",
        error instanceof Error ? error.message : String(error)
      );
      return error instanceof Error ? error.message : String(error);
    },
  });
};

export const getMessagesFromSession = async (chatSessionId: string) => {
  const messages = await db.message.findMany({
    where: { chatSessionId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      content: true,
      role: true,
      attachments: {
        select: {
          id: true,
          url: true,
          type: true,
          format: true,
        },
      },
    },
  });

  return messages;
};
