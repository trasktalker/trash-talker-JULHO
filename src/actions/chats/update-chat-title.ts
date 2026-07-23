"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { chat } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const updateChatTitle = async (chatId: string, newTitle: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not authenticated");
  }

  await db
    .update(chat)
    .set({ title: newTitle })
    .where(and(eq(chat.id, chatId), eq(chat.userId, session.user.id)));

  revalidatePath("/", "layout");
};
