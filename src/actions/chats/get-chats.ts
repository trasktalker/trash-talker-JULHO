"use server";

import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { chat } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getChats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return [];

  const chats = await db
    .select()
    .from(chat)
    .where(eq(chat.userId, session.user.id))
    .orderBy(desc(chat.updatedAt));

  return chats;
}
