import { Copy, Pencil } from "lucide-react";
import MarkdownRenderer from "../shared/markdown-renderer";
import { Button } from "@chatgpt/ui";
import UploadedFileComponent from "../shared/uploaded-file";
import { UploadedFile } from "@/lib/types/file";

interface ChatBlockProps {
  role: "user" | "assistant";
  content?: string;
  attachments?: UploadedFile[] | undefined;
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
      <ul className="group flex flex-col items-end max-w-[33.6rem] place-self-end pt-12">
        {attachments &&
          attachments.length > 0 &&
          attachments.map((attachment) => (
            <UploadedFileComponent
              inserted={true}
              key={attachment.id}
              id={attachment.id}
              type={attachment.type}
              url={attachment.url}
              name={attachment.name}
              format={attachment.format}
            />
          ))}
        <span className="bg-dark-200 w-fit rounded-tr-md rounded-3xl text-white py-3 px-4">
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
