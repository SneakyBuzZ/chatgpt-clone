import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";
import useChatStore from "../store/chat-store";

export const useGetChatMessages = (chatSessionId: string) => {
  const { setMessages } = useChatStore.getState();
  return useQuery({
    queryKey: ["chat-sessions", chatSessionId],
    queryFn: async () => {
      const response = await api.get(`/message/${chatSessionId}`);
      setMessages(response.data.payload ?? []);
      return response.data.payload;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};
