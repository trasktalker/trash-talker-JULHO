import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { and, eq, asc } from "drizzle-orm";
import { ChatView } from "./_components/chat-view";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  // Verify ownership
  const [currentChat] = await db
    .select()
    .from(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, session.user.id)));

  if (!currentChat) {
    redirect("/dashboard");
  }

  // Get messages
  const messages = await db
    .select()
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt));

  return (
    <div className="flex flex-col h-full flex-1">
      <ChatView initialMessages={messages} chatId={chatId} />
    </div>
  );
}
