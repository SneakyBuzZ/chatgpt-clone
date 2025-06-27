"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { Components } from "react-markdown";
import { cn } from "@chatgpt/utils";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  const customComponents: Components = {
    code({ children, className, ...props }: React.ComponentProps<"code">) {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match?.[1];

      if (!lang) {
        return (
          <code className="px-1 py-0.5 rounded bg-muted text-white font-mono text-sm">
            {children}
          </code>
        );
      }

      return (
        <div className="relative bg-dark-500 rounded-2xl p-4">
          {lang && (
            <div className="absolute top-0 left-0 z-20 text-xs text-white p-4 rounded-t-md font-mono">
              {lang}
            </div>
          )}
          <pre className="w-full overflow-x-auto text-sm leading-[1.6] -translate-x-3 text-white pt-10 p-0">
            <code
              className={cn("w-full h-full", className)}
              style={{ backgroundColor: "transparent" }}
              {...props}
            >
              {children}
            </code>
          </pre>
        </div>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="my-[16px] border-l-[3px] border-neutral-600 pl-[16px] italic text-neutral-400">
          {children}
        </blockquote>
      );
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          {children}
        </a>
      );
    },
    ul({ children }) {
      return (
        <ul className="my-[14px] ml-[22px] list-disc space-y-[8px] text-[15px] text-neutral-200 leading-[1.6]">
          {children}
        </ul>
      );
    },
    ol({ children }) {
      return (
        <ol className="my-[14px] ml-[22px] list-decimal space-y-[8px] text-[15px] text-neutral-200 leading-[1.6]">
          {children}
        </ol>
      );
    },
    li({ children }) {
      return <li className="text-[15px] leading-[1.6]">{children}</li>;
    },
    p({ children }) {
      return (
        <p className="text-[15px] leading-[1.8] text-neutral-300 my-[14px] whitespace-pre-line">
          {children}
        </p>
      );
    },
    h1({ children }) {
      return (
        <h1 className="text-[24px] font-semibold text-white my-[28px]">
          {children}
        </h1>
      );
    },
    h2({ children }) {
      return (
        <h2 className="text-[20px] font-semibold text-white my-[24px]">
          {children}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3 className="text-[17px] font-medium text-white my-[20px]">
          {children}
        </h3>
      );
    },
    hr() {
      return <hr className="my-[24px] border-dark-200" />;
    },
  };

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={customComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
