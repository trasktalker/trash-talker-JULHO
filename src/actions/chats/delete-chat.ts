"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { chat } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const deleteChat = async (chatId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not authenticated");
  }

  await db
    .delete(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, session.user.id)));

  revalidatePath("/", "layout");
  redirect("/dashboard");
};
