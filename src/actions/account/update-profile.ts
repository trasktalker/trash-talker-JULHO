"use server";

import "server-only";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const updateProfileSchema = z.object({
  name: z.string().min(2),
  image: z.string().optional().or(z.literal("")),
});

export const updateProfile = async (
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> => {
  const rawData = {
    name: formData.get("name"),
    image: formData.get("image"),
  };

  const { success, data, error } = updateProfileSchema.safeParse(rawData);

  if (!success) {
    return { error: "Invalid data provided" };
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Not authenticated" };
    }

    await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: data.name,
        image: data.image || undefined,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: (err as Error).message ?? "Something went wrong",
    };
  }

  revalidatePath("/", "layout");
  return { success: true };
};
