import { Copy, Pencil } from "lucide-react";
import MarkdownRenderer from "../shared/markdown-renderer";
import { Button, Textarea } from "@chatgpt/ui";
import UploadedFileComponent from "../shared/uploaded-file";
import { UploadedFile } from "@/lib/types/file";
import { useState } from "react";
import { nanoid } from "nanoid";
import useChatStore from "@/lib/store/chat-store";
import { usePathname } from "next/navigation";

interface ChatBlockProps {
  role: "user" | "assistant";
  content?: string;
  attachments?: UploadedFile[] | undefined;
  messageId?: string;
  streamingMessageRef?: React.RefObject<string | null>;
  complete?: (
    prompt: string,
    options?: {
      body: {
        isEdit: boolean;
        messageId?: string;
        chatSessionId: string;
      };
    }
  ) => Promise<string | null | undefined>;
}

export default function ChatBlock({
  role = "user",
  content,
  attachments,
  messageId,
  streamingMessageRef,
  complete,
}: ChatBlockProps) {
  const pathname = usePathname();
  const chatSessionId = pathname.split("/")[2]!;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content || "");
  const { addMessage, setStreamingMessageId, removeMessagesAfterId } =
    useChatStore();

  if (role !== "assistant" && role !== "user") {
    return null;
  }

  const handleEdit = () => {
    setIsEditing((state) => !state);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(content || "");
  };

  const handleSend = async () => {
    if (
      editedContent.length === 0 ||
      editedContent.trim().length === content?.trim().length
    ) {
      return;
    }

    if (!messageId) {
      throw new Error("Message ID is required for editing");
    }

    removeMessagesAfterId(messageId);

    const assistantId = nanoid();
    addMessage({ id: assistantId, content: "", role: "assistant" });

    if (!complete || !streamingMessageRef) {
      throw new Error("Missing complete function or assistantMessageIdRef");
    }

    streamingMessageRef.current = assistantId;
    setStreamingMessageId(assistantId);

    setIsEditing(false);
    await complete(editedContent, {
      body: {
        isEdit: true,
        messageId: messageId,
        chatSessionId,
      },
    });
  };

  if (role === "user") {
    if (isEditing) {
      return (
        <div className="py-5 flex justify-center items-center w-full">
          <div className="flex flex-col w-full bg-dark-100/80 rounded-3xl p-2">
            <Textarea
              className="text-md text-white"
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            />
            <div className="flex justify-end items-center mt-2 w-full gap-2 p-2">
              <Button
                variant={"secondary"}
                onClick={handleCancel}
                className="bg-dark-400 text-white"
              >
                Cancel
              </Button>
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </div>
      );
    }

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
        <span className="bg-dark-200 w-fit rounded-tr-md rounded-3xl text-white py-3 px-4 whitespace-pre-wrap">
          {editedContent || content}
        </span>
        <div className="opacity-0 group-hover:opacity-100 flex justify-end items-center transition-opacity duration-500 mt-2">
          <Button
            size={"icon"}
            className="bg-transparent hover:bg-dark-200 rounded-lg shadow-none h-8 w-8"
          >
            <Copy size={17} color="#fff" />
          </Button>
          <Button
            onClick={handleEdit}
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
