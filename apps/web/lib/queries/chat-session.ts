import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useGetChatSessions = () => {
  return useQuery<{ title: string; id: string }[]>({
    queryKey: ["chat-sessions"],
    queryFn: async (): Promise<{ title: string; id: string }[]> => {
      const response = await api.get(`/chat`);
      return response.data.payload ?? [];
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};
