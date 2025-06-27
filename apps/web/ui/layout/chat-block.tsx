import { Copy, Pencil } from "lucide-react";
import MarkdownRenderer from "../shared/markdown-renderer";
import { Button } from "@chatgpt/ui";

interface ChatBlockProps {
  role: "user" | "assistant";
  content?: string;
}

export default function ChatBlock({ role = "user", content }: ChatBlockProps) {
  if (role !== "assistant" && role !== "user") {
    return null;
  }
  if (role === "user") {
    return (
      <li className="group flex flex-col max-w-[33.6rem] place-self-end ">
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
      </li>
    );
  }

  return <MarkdownRenderer content={content || ""} />;
}
