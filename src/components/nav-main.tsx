"use client";

import { PlusCircle } from "lucide-react";
import { useTransition } from "react";
import { createChat } from "@/actions/chats/create-chat";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavNewChat() {
  const [isPending, startTransition] = useTransition();

  const handleNewChat = () => {
    startTransition(() => {
      createChat();
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleNewChat}
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground duration-200 ease-linear font-medium"
            >
              <PlusCircle className="mr-2" />
              <span>{isPending ? "Creating..." : "New Chat"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
