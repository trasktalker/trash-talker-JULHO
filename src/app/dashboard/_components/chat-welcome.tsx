"use client";

import * as React from "react";
import { useTransition } from "react";
import { createChat } from "@/actions/chats/create-chat";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

export function ChatWelcome() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isPending) return;

    // In Stage 2, we just create a chat. The initial message could be passed via localStorage or query,
    // but for now we just create the chat. Stage 3 will handle sending the first message via ai SDK.
    startTransition(() => {
      createChat();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-foreground">
        Jogar conversa fora.
      </h1>
      <p className="text-muted-foreground text-center mb-8 max-w-lg">
        Escolha uma de nossas adoráveis personalidades e mande uma mensagem para
        começar.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Mande uma mensagem..."
          className="min-h-[60px] w-full resize-none rounded-2xl bg-card border-border pr-14 text-base focus-visible:ring-primary shadow-sm"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isPending}
          className="absolute right-2 bottom-2 size-8 rounded-full"
        >
          <SendHorizontal className="size-4" />
        </Button>
      </form>
    </div>
  );
}
