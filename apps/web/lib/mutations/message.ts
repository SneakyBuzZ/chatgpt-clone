import { useMutation } from "@tanstack/react-query";
import { api } from "../axios";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: async (payload: { prompt: string; chatSessionId: string }) => {
      const response = await api.post(`/message/${payload.chatSessionId}`, {
        prompt: payload.prompt,
      });
      return response;
    },
  });
};
