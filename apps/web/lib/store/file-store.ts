import { create } from "zustand";

type UploadedFile = {
  id: string;
  url: string;
  type: string;
  name: string;
  format: string;
};

type State = {
  uploadedFiles: UploadedFile[];
};

type Actions = {
  addFile: (file: UploadedFile) => void;
  removeFile: (id: string) => void;
  reset: () => void;
};

const useFileStore = create<State & Actions>((set) => ({
  uploadedFiles: [],
  addFile: (file) =>
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, file],
    })),
  removeFile: (id) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((file) => file.id !== id),
    })),
  reset: () =>
    set(() => ({
      uploadedFiles: [],
    })),
}));

export default useFileStore;
