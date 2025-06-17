"use client";

import * as React from "react";
import { cn } from "@chatgpt/utils";

const AUTO_RESIZE_MAX_HEIGHT = 200;
const AUTO_RESIZE_MIN_HEIGHT = 60;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, style, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

  const handleInput = React.useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const textarea = e.currentTarget;
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, AUTO_RESIZE_MAX_HEIGHT);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > AUTO_RESIZE_MAX_HEIGHT ? "auto" : "hidden";
    },
    []
  );

  React.useEffect(() => {
    const textarea = innerRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, AUTO_RESIZE_MAX_HEIGHT);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > AUTO_RESIZE_MAX_HEIGHT ? "auto" : "hidden";
    }
  }, [props.value]);

  return (
    <textarea
      ref={innerRef}
      className={cn(
        "flex min-h-[40px] max-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-lg shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed ui-resize-none disabled:opacity-50 md:text-sm",
        className
      )}
      style={{
        ...style,
        minHeight: AUTO_RESIZE_MIN_HEIGHT,
        maxHeight: AUTO_RESIZE_MAX_HEIGHT,
        resize: "none",
        overflowY: "hidden",
      }}
      onInput={handleInput}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
