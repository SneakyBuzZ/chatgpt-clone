import { useCompletion } from "@ai-sdk/react";
import useFileStore from "../store/file-store";
import { delay } from "@chatgpt/utils";

export function useChatCompletion(chatSessionId: string) {
  const { reset } = useFileStore();
  const { complete, completion } = useCompletion({
    api: `/api/message/${chatSessionId}`,
    onFinish: () => {
      reset();
      delay(3000).then(() => console.log("Upload reset"));
    },
  });

  return { complete, completion };
}
