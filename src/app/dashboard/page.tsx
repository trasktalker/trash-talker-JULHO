// app/dashboard/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ChatWelcome } from "./_components/chat-welcome";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 h-full flex-1">
      <ChatWelcome />
    </div>
  );
}
