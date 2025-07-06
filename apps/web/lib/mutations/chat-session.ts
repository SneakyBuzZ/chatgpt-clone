import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useCreateChatSession = () => {
  return useMutation({
    mutationFn: async (payload: { prompt: string }) => {
      const response = await api.post("/chat", payload);
      return response;
    },
  });
};

export const useDeleteChatSession = () => {
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await api.delete(`/chat/${sessionId}`);
      return response;
    },
  });
};
