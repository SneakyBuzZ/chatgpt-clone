import { useCompletion } from "@ai-sdk/react";
import useFileStore from "../store/file-store";
import { delay } from "@chatgpt/utils";
import { useEffect, useRef } from "react";
import useChatStore from "../store/chat-store";

export function useChatCompletion() {
  const streamingMessageRef = useRef<string | null>(null);
  const { reset } = useFileStore();
  const { updateMessage } = useChatStore();

  const { complete, completion, isLoading } = useCompletion({
    api: `/api/message`,
    onFinish: () => {
      delay(3000);
      reset();
    },
  });

  useEffect(() => {
    if (streamingMessageRef.current && typeof completion === "string") {
      updateMessage(completion, streamingMessageRef.current);
    }
  }, [completion, updateMessage, streamingMessageRef]);

  return { complete, completion, streamingMessageRef, isLoading };
}
