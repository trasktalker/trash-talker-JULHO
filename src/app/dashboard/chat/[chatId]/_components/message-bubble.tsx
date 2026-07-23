"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

type Message = {
  role: string;
  content: string;
};

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 max-w-3xl mx-auto",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full size-8",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {isUser ? <User className="size-5" /> : <Bot className="size-5" />}
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[80%]",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "px-4 py-3 rounded-2xl",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0">
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
