import { create } from "zustand";
import { UploadedFile } from "../types/file";

type State = {
  prompt: string | undefined;
  attachments: UploadedFile[];
};

type Actions = {
  setPrompt: (prompt: string) => void;
  addAttachment: (file: UploadedFile) => void;
  addAttachments: (files: UploadedFile[]) => void;
  removeAttachment: (id: string) => void;
  reset: () => void;
};

const useNewSessionStore = create<State & Actions>((set) => ({
  prompt: undefined,
  attachments: [],
  setPrompt: (prompt) => set({ prompt }),
  addAttachment: (file) =>
    set((state) => ({
      attachments: [...state.attachments, file],
    })),
  addAttachments: (files) =>
    set((state) => ({
      attachments: [...state.attachments, ...files],
    })),

  removeAttachment: (id) =>
    set((state) => ({
      attachments: state.attachments.filter((file) => file.id !== id),
    })),
  reset: () =>
    set(() => ({
      prompt: "",
      attachments: [],
    })),
}));

export { useNewSessionStore };
