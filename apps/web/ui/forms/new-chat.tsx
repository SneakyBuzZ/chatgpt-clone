"use client";

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from "@chatgpt/ui";
import React, { RefObject } from "react";
import {
  ArrowUp,
  AudioLines,
  Mic,
  Plus,
  Settings2,
  Square,
} from "lucide-react";
import { nanoid } from "nanoid";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@chatgpt/utils";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import useChatStore from "@/lib/store/chat-store";
import { useCreateMessage } from "@/lib/mutations/message";
import { ChatRequestOptions } from "ai";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
});

interface NewChatFormProps {
  type?: "new" | "existing";
  className?: string;
  complete: (
    prompt: string,
    options?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  assistantMessageIdRef: RefObject<string | null>;
}

export default function NewChatForm({
  type,
  className,
  complete,
  assistantMessageIdRef,
}: NewChatFormProps) {
  const path = usePathname();
  const chatSessionId = path.split("/")[2] || "";

  const { mutateAsync: createMessage, isPending } = useCreateMessage();
  const { addMessage, setStreamingMessageId } = useChatStore.getState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const { prompt } = form.watch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "new") {
        await createMessage({ prompt: values.prompt, chatSessionId: "new" });
      } else {
        addMessage({
          id: nanoid(),
          content: values.prompt,
          role: "user",
        });

        const assistantId = nanoid();
        addMessage({
          id: assistantId,
          content: "",
          role: "assistant",
        });
        assistantMessageIdRef.current = assistantId;
        setStreamingMessageId(assistantId);

        await complete(values.prompt, {
          body: { chatSessionId },
        });

        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.error("Error creating chat session:", error);
    } finally {
      form.reset();
    }
  }

  return (
    <Headings type={type}>
      <FormProvider {...form}>
        <div
          className={cn(
            "flex w-[770px] flex-col justify-center items-center bg-dark-400 pb-2",
            className
          )}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"w-full flex-col rounded-[30px] bg-dark-200 p-2 py-3"}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      autoComplete="off"
                      placeholder="Ask anything"
                      className="max-h-[200px] text-base resize-none text-neutral-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-1">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="rounded-full"
                >
                  <Plus size={17} />
                </Button>
                <Button size={"sm"} variant={"ghost"} className="rounded-full">
                  <Settings2 size={17} />
                  Tools
                </Button>
              </div>
              <div className="flex justify-center items-center gap-1 ">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="rounded-full"
                >
                  <Mic size={17} />
                </Button>
                {prompt.length > 0 ? (
                  <>
                    {isPending ? (
                      <Button
                        size={"icon"}
                        className="rounded-full bg-white transition-all"
                      >
                        <Square fill="#000" size={17} />
                      </Button>
                    ) : (
                      <Button
                        size={"icon"}
                        className="transition-all"
                        type="submit"
                      >
                        <ArrowUp size={17} strokeWidth={4} />
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="rounded-full"
                  >
                    <AudioLines size={17} />
                  </Button>
                )}
              </div>
            </div>
          </form>
          {type === "existing" && (
            <span className="text-xs text-neutral-100 mt-2">
              ChatGPT can make mistakes. Check important info. See
              <span className="underline"> Cookie Preferences.</span>
            </span>
          )}
        </div>
      </FormProvider>
    </Headings>
  );
}

function Headings({
  type = "new",
  children,
}: {
  type?: "new" | "existing";
  children: React.ReactNode;
}) {
  if (type === "existing") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 -translate-y-3">
      <h1 className="text-3xl text-white">Whats on the agenda today?</h1>
      {children}
    </div>
  );
}
