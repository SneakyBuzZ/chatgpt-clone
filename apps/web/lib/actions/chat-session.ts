import { model } from "@chatgpt/ai";
import { db } from "@chatgpt/prisma";
import { auth } from "@clerk/nextjs/server";

export const createChatSession = async (prompt: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { response } = await model.generateContent(
    `Summarize the following prompt into a concise chat with upto 4 words
    **dont add any punctuation like full stops or commas**
    **First letter of each word should be captial**

    here's the prompt:
    ${prompt}
    `
  );

  const newChatSessionName = response.text();

  const session = await db.chatSession.create({
    data: {
      title: newChatSessionName,
      userId,
    },
    select: {
      id: true,
    },
  });

  return session.id;
};

export const getChatSessions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chatSessions = await db.chatSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
    },
  });

  return chatSessions;
};

export const deleteChatSession = async (sessionId: string) => {
  await db.chatSession.delete({
    where: {
      id: sessionId,
    },
  });
};
