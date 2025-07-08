"use client";

import { usePathname } from "next/navigation";

import { useGetChatMessages } from "@/lib/queries/message";
import useChatStore from "@/lib/store/chat-store";

import PrivateNav from "@/ui/layout/private-nav";
import ChatBlock from "@/ui/layout/chat-block";
import NewChatForm from "@/ui/forms/new-chat";

import { useChatCompletion } from "@/lib/hooks/use-chat-completion";
import { useNewSessionStore } from "@/lib/store/new-session-store";
import React, { useEffect, useRef } from "react";
import { TextShimmer } from "@chatgpt/ui";

export default function ChatPage() {
  const pathname = usePathname();
  const chatSessionId = pathname.split("/")[2]!;

  const { complete, completion, streamingMessageRef, isLoading } =
    useChatCompletion();
  const { prompt, attachments } = useNewSessionStore();
  const { messages } = useChatStore();

  useGetChatMessages(chatSessionId);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      if (isLoading) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        return;
      }
      el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
    }
  }, [messages, isLoading]);

  const hasStreamedRef = useRef(false);

  useEffect(() => {
    if (!prompt || hasStreamedRef.current) return;
    hasStreamedRef.current = true;

    complete(prompt, {
      body: {
        uploadedFiles: attachments,
        isEdit: false,
        chatSessionId,
      },
    }).then(() => {
      hasStreamedRef.current = false;
      window.location.reload();
    });
  }, [prompt, attachments, chatSessionId, complete]);

  return (
    <main className="flex flex-1 flex-col w-full min-h-screen bg-dark-400">
      <div className="sticky top-0 z-40 w-full">
        <PrivateNav />
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto py-8">
        {prompt ? (
          <React.Fragment key={"chat-session"}>
            <ul className="w-[90%] lg:w-[640px] xl:w-[770px] mx-auto space-y-4 pb-32">
              <ChatBlock
                key="initial-prompt"
                role="user"
                content={prompt}
                attachments={attachments}
              />
              {isLoading && (
                <TextShimmer className="font-mono text-sm" duration={1}>
                  Generating code...
                </TextShimmer>
              )}
              <ChatBlock
                key="cross-stream-message"
                role="assistant"
                content={completion}
              />
            </ul>
          </React.Fragment>
        ) : (
          <>
            <ul className="w-[90%] lg:w-[640px] xl:w-[770px] mx-auto space-y-4 pb-32">
              {messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                  <ChatBlock
                    role={msg.role}
                    content={msg.content}
                    attachments={msg.attachments}
                    messageId={msg.id}
                    streamingMessageRef={streamingMessageRef}
                    complete={complete}
                  />
                  {index === messages.length - 2 && isLoading && (
                    <TextShimmer className="font-mono text-sm" duration={1}>
                      Generating code...
                    </TextShimmer>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="sticky bottom-0 z-50 w-full bg-dark-400 px-4 flex justify-center">
        <NewChatForm
          type="existing"
          complete={complete}
          streamingMessageRef={streamingMessageRef}
        />
      </div>
    </main>
  );
}
