import { streamText } from "ai";
import { db } from "@chatgpt/prisma";
import { createDataStreamResponse } from "ai";
import { google } from "@ai-sdk/google";
import { memo, SYSTEM_PROMPT } from "@chatgpt/ai";
import { UploadedFile } from "../types/file";

export const createMessage = async (
  prompt: string,
  chatSessionId: string,
  uploadedFiles: UploadedFile[]
) => {
  const { id: messageId } = await db.message.create({
    data: {
      content: prompt,
      role: "user",
      chatSessionId,
    },
    select: { id: true },
  });

  if (uploadedFiles?.length > 0) {
    await db.file.createMany({
      data: uploadedFiles.map((file) => ({
        id: file.id,
        url: file.url,
        name: file.name,
        type: file.type,
        format: file.format,
        messageId,
      })),
    });
  }

  const messages = await db.message.findMany({
    where: { chatSessionId },
    orderBy: { createdAt: "asc" },
    take: 10,
  });

  const history = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const memory = await memo.search(prompt, {
    user_id: chatSessionId,
    limit: 2,
  });

  const memoHistory = memory.map(
    (item) =>
      ({
        role: "user",
        content: `Here's a relevant memory: ${item.data?.memory}`,
      }) as const
  );

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: google("gemini-1.5-flash"),
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...memoHistory,
          ...history,
        ],
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

export const updateMessage = async (
  prompt: string,
  messageId: string,
  chatSessionId: string
) => {
  const { createdAt } = await db.message.update({
    where: { id: messageId },
    data: {
      content: prompt,
    },
    select: {
      createdAt: true,
    },
  });

  await db.message.deleteMany({
    where: {
      chatSessionId,
      createdAt: { gt: createdAt },
    },
  });

  const messages = await db.message.findMany({
    where: { chatSessionId },
    orderBy: { createdAt: "asc" },
    take: 10,
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
          name: true,
        },
      },
    },
  });

  return messages;
};
