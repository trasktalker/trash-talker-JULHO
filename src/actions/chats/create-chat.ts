"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { chat } from "@/db/schema";

export const createChat = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not authenticated");
  }

  const [newChat] = await db
    .insert(chat)
    .values({
      userId: session.user.id,
      title: "New Chat",
    })
    .returning();

  revalidatePath("/", "layout");
  redirect(`/dashboard/chat/${newChat.id}`);
};
