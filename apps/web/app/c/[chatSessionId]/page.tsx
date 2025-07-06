"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useGetChatMessages } from "@/lib/queries/message";
import useChatStore from "@/lib/store/chat-store";

import PrivateNav from "@/ui/layout/private-nav";
import ChatBlock from "@/ui/layout/chat-block";
import NewChatForm from "@/ui/forms/new-chat";

import { useChatCompletion } from "@/lib/hooks/use-chat-completion";
import { useNewSessionStore } from "@/lib/store/new-session-store";
import { useCreateMessage } from "@/lib/mutations/message";

export default function ChatPage() {
  const pathname = usePathname();
  const chatSessionId = pathname.split("/")[2]!;

  const { complete, completion } = useChatCompletion(chatSessionId);
  const { prompt, attachments, reset } = useNewSessionStore();
  const { mutateAsync: createMessage } = useCreateMessage();
  const { updateMessage } = useChatStore();

  const { messages, streamingMessageId } = useChatStore();

  const assistantMessageIdRef = useRef<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGetChatMessages(chatSessionId);

  useEffect(() => {
    if (!prompt) return;
    createMessage({
      chatSessionId,
      prompt,
    }).then(() => {
      reset();
      window.location.reload();
    });
  }, [chatSessionId, prompt, reset, createMessage]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length, streamingMessageId]);

  useEffect(() => {
    if (assistantMessageIdRef.current && typeof completion === "string") {
      updateMessage(completion, assistantMessageIdRef.current);
    }
  }, [completion, updateMessage]);

  return (
    <main className="flex flex-col h-full min-h-screen bg-dark-400">
      <div className="sticky top-0 z-40 w-full">
        <PrivateNav />
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-2 py-8"
        role="log"
        aria-live="polite"
      >
        {prompt ? (
          <>
            <ul className="max-w-3xl mx-auto space-y-4 pb-32">
              <ChatBlock
                key="initial-prompt"
                role="user"
                content={prompt}
                attachments={attachments}
              />
            </ul>
          </>
        ) : (
          <>
            <ul className="max-w-3xl mx-auto space-y-4 pb-32">
              {messages.map((msg) => (
                <ChatBlock
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  attachments={msg.attachments}
                />
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="sticky bottom-0 z-50 w-full bg-dark-400 px-4 flex justify-center">
        <NewChatForm
          type="existing"
          complete={complete}
          assistantMessageIdRef={assistantMessageIdRef}
        />
      </div>
    </main>
  );
}
