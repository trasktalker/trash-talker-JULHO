"use client";

import * as React from "react";
import { MessageBubble } from "./message-bubble";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

type Message = {
  id: string;
  role: string;
  content: string;
};

export function ChatView({
  initialMessages,
  chatId,
}: {
  initialMessages: Message[];
  chatId: string;
}) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // TODO: In Stage 3, we will call the AI streaming API here
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-4rem)]">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Sem mensagens ainda. Comece a jogar conversa fora!
          </div>
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </div>

      <div className="p-4 bg-background border-t">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex gap-2"
        >
          {/* TODO: In Stage 3, add PersonalitySelector here */}
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="min-h-[60px] w-full resize-none rounded-2xl bg-card border-border pr-14 text-base focus-visible:ring-primary shadow-sm"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="absolute right-2 bottom-2 size-8 rounded-full"
            >
              <SendHorizontal className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
