import { create } from "zustand";
import { ChatMessage } from "../types/message";

type State = {
  messages: ChatMessage[];
  streamingMessageId: string | null;
  isLoading: boolean;
};

type Actions = {
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (chunk: string, id: string) => void;
  removeMessagesAfterId: (id: string) => void;
  setStreamingMessageId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useChatStore = create<State & Actions>((set) => ({
  messages: [],
  streamingMessageId: null,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (chunk, id) =>
    set((state) => {
      const index = state.messages.findIndex((msg) => msg.id === id);
      if (index === -1 || !state.messages[index]) {
        return state;
      }

      const updated = {
        ...state.messages[index],
        content: chunk,
      };

      const updatedMessages = [...state.messages];
      updatedMessages[index] = updated;

      return { messages: updatedMessages };
    }),

  removeMessagesAfterId: (id) =>
    set((state) => {
      const index = state.messages.findIndex((msg) => msg.id === id);
      if (index === -1) return state;
      return {
        messages: state.messages.slice(0, index + 1),
      };
    }),
  setStreamingMessageId: (id) => set({ streamingMessageId: id }),
  reset: () => set({ messages: [] }),
}));

export default useChatStore;
