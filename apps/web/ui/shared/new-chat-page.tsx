import React from "react";
import PrivateNav from "../layout/private-nav";
import NewChatForm from "../forms/new-chat";
import { useNewSessionStore } from "@/lib/store/new-session-store";
import ChatBlock from "../layout/chat-block";

export default function NewChatPage() {
  const { prompt, attachments } = useNewSessionStore();

  if (!prompt) {
    return (
      <main className="relative flex flex-col items-center justify-center h-full pb-20 px-16 md:px-5">
        <PrivateNav />
        <h3 className="text-[1.7rem] text-neutral-200 mb-8">
          What&apos;s on your mind today?
        </h3>
        <NewChatForm type="new" />
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col h-full min-h-screen bg-dark-400">
        <div className="sticky top-0 z-40 w-full">
          <PrivateNav />
        </div>

        <div
          className="flex-1 overflow-y-auto px-2 py-8"
          role="log"
          aria-live="polite"
        >
          <ul className="max-w-3xl mx-auto space-y-4 pb-32">
            <ChatBlock
              key={"initial-prompt"}
              role={"user"}
              content={prompt}
              attachments={attachments}
            />
          </ul>
        </div>

        <div className="sticky bottom-0 z-50 w-full bg-dark-400 px-4 flex justify-center">
          <NewChatForm type="existing" />
        </div>
      </main>
    </>
  );
}
