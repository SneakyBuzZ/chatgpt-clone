import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useCreateChatSession = () => {
  return useMutation({
    mutationFn: async (payload: { prompt: string }) => {
      const response = await api.post("/chat", {
        json: payload,
      });
      return response;
    },
  });
};
