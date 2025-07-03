import { Copy, Pencil } from "lucide-react";
import MarkdownRenderer from "../shared/markdown-renderer";
import { Button } from "@chatgpt/ui";
import { Attachments } from "@/lib/store/chat-store";
import UploadedFile from "../shared/uploaded-file";

interface ChatBlockProps {
  role: "user" | "assistant";
  content?: string;
  attachments?: Attachments[] | undefined;
}

export default function ChatBlock({
  role = "user",
  content,
  attachments,
}: ChatBlockProps) {
  if (role !== "assistant" && role !== "user") {
    return null;
  }

  if (role === "user") {
    return (
      <ul className="group flex flex-col max-w-[33.6rem] place-self-end mt-12">
        {attachments &&
          attachments.length > 0 &&
          attachments.map((attachment) => (
            <UploadedFile
              key={attachment.id}
              id={attachment.id}
              type={attachment.type}
              url={attachment.url}
              name={attachment.name}
              format={attachment.format}
            />
          ))}
        <span className="bg-dark-200 rounded-3xl text-white py-3 px-4">
          {content}
        </span>
        <div className="opacity-0 group-hover:opacity-100 flex justify-end items-center transition-opacity duration-500 mt-2">
          <Button
            size={"icon"}
            className="bg-transparent hover:bg-dark-200 rounded-lg shadow-none h-8 w-8"
          >
            <Copy size={17} color="#fff" />
          </Button>
          <Button
            size={"icon"}
            className="bg-transparent hover:bg-dark-200 rounded-lg shadow-none h-8 w-8"
          >
            <Pencil size={17} color="#fff" />
          </Button>
        </div>
      </ul>
    );
  }

  return <MarkdownRenderer content={content || ""} />;
}
