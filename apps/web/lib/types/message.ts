import { UploadedFile } from "./file";

export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  attachments?: UploadedFile[];
};
