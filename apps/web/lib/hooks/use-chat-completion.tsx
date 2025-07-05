import { useCompletion } from "@ai-sdk/react";
import useFileStore from "../store/file-store";

export function useChatCompletion(chatSessionId: string) {
  const { reset } = useFileStore();
  const { complete, completion } = useCompletion({
    api: `/api/message/${chatSessionId}`,
    onFinish: () => {
      reset();
    },
  });

  return { complete, completion };
}
