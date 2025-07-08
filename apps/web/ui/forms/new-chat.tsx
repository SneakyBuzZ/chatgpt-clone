"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nanoid } from "nanoid";
import { RefObject, useState } from "react";

import { FormField, FormItem, FormControl, Textarea } from "@chatgpt/ui";
import useChatStore from "@/lib/store/chat-store";
import useFileStore from "@/lib/store/file-store";
import FilePreviewBar from "@/ui/shared/file-preview-bar";
import InputToolbar from "@/ui/shared/input-toolbar";
import { cn } from "@chatgpt/utils";
import { ChatMessage } from "@/lib/types/message";
import { useNewSessionStore } from "@/lib/store/new-session-store";
import { useCreateChatSession } from "@/lib/mutations/chat-session";
import { usePathname, useRouter } from "next/navigation";
import { UploadedFile } from "@/lib/types/file";

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

interface NewChatFormProps {
  type?: "new" | "existing";
  className?: string;
  complete?: (
    prompt: string,
    options?: {
      body: {
        uploadedFiles?: UploadedFile[];
        isEdit: boolean;
        messageId?: string;
        chatSessionId: string;
      };
    }
  ) => Promise<string | null | undefined>;
  streamingMessageRef?: RefObject<string | null>;
}

export default function NewChatForm({
  type = "new",
  className,
  complete,
  streamingMessageRef,
}: NewChatFormProps) {
  const pathname = usePathname();
  const chatSessionId = pathname.split("/")[2]!;
  const { uploadedFiles } = useFileStore();
  const { addMessage, setStreamingMessageId } = useChatStore();
  const { setPrompt, addAttachments } = useNewSessionStore();
  const { mutateAsync: createChatSession } = useCreateChatSession();
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const { watch, handleSubmit, reset, control } = form;
  const prompt = watch("prompt");

  async function handleSend(values: z.infer<typeof formSchema>) {
    setIsSent(true);
    try {
      const userMessage: ChatMessage = {
        id: nanoid(),
        content: values.prompt,
        role: "user",
        attachments: uploadedFiles.map((file) => ({
          id: file.id,
          url: file.url,
          type: file.type,
          name: file.name,
          format: file.format,
        })),
      };

      addMessage(userMessage);

      const assistantId = nanoid();
      addMessage({
        id: assistantId,
        content: "",
        role: "assistant",
      });

      if (type === "new") {
        setPrompt(values.prompt);
        addAttachments(uploadedFiles);
        const response = await createChatSession({ prompt: values.prompt });
        router.push(`/c/${response.data.id}`);
        return;
      }

      if (!complete || !streamingMessageRef) {
        throw new Error("Missing complete function or assistantMessageIdRef");
      }

      streamingMessageRef.current = assistantId;
      setStreamingMessageId(assistantId);

      await complete(values.prompt, {
        body: {
          uploadedFiles: uploadedFiles.map((file) => ({
            id: file.id,
            url: file.url,
            name: file.name,
            type: file.type,
            format: file.format,
          })),
          isEdit: false,
          chatSessionId,
        },
      });
    } catch (error) {
      console.error("Prompt submission error:", error);
    } finally {
      reset();
      setIsSent(false);
    }
  }

  return (
    <FormProvider {...form}>
      <div
        className={cn(
          "flex w-[93%] lg:w-[640px] xl:w-[770px] flex-col justify-center items-center bg-dark-400 pb-2",
          className
        )}
      >
        <form
          onSubmit={handleSubmit(handleSend)}
          className="w-full flex flex-col bg-dark-200 rounded-3xl p-2"
        >
          {uploadedFiles && uploadedFiles.length > 0 && (
            <FilePreviewBar files={uploadedFiles} />
          )}

          <FormField
            control={control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {!isSent ? (
                    <Textarea
                      {...field}
                      placeholder="Ask anything..."
                      className="max-h-[200px] text-base resize-none text-neutral-200"
                      autoComplete="off"
                      aria-label="Prompt input"
                    />
                  ) : (
                    <Textarea
                      className="max-h-[200px] text-base resize-none text-neutral-400"
                      autoComplete="off"
                      placeholder="Ask anything..."
                      aria-label="Sending prompt"
                      disabled
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />

          <InputToolbar isPending={isSent} prompt={prompt} />
        </form>

        {type === "existing" && (
          <p className="text-xs text-neutral-400 mt-2 text-center">
            ChatGPT can make mistakes. Double-check important info.
          </p>
        )}
      </div>
    </FormProvider>
  );
}
