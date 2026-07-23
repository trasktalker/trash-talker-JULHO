"use client";

import * as React from "react";
import { MoreHorizontal, Trash2, Edit2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getChats } from "@/actions/chats/get-chats";
import { deleteChat } from "@/actions/chats/delete-chat";
import { updateChatTitle } from "@/actions/chats/update-chat-title";

type Chat = {
  id: string;
  title: string;
  updatedAt: Date;
};

export function NavChats() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const [chats, setChats] = React.useState<Chat[]>([]);

  const loadChats = React.useCallback(() => {
    getChats().then(setChats);
  }, []);

  React.useEffect(() => {
    loadChats();
  }, [pathname, loadChats]);

  const handleRename = async (chatId: string, oldTitle: string) => {
    const newTitle = prompt("New title:", oldTitle);
    if (newTitle && newTitle !== oldTitle) {
      await updateChatTitle(chatId, newTitle);
      loadChats();
    }
  };

  const handleDelete = async (chatId: string) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      await deleteChat(chatId);
      loadChats();
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        {chats.map((c) => (
          <SidebarMenuItem key={c.id}>
            <SidebarMenuButton
              asChild
              isActive={pathname === `/dashboard/chat/${c.id}`}
            >
              <Link href={`/dashboard/chat/${c.id}`} title={c.title}>
                <MessageSquare />
                <span className="truncate">{c.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem onClick={() => handleRename(c.id, c.title)}>
                  <Edit2 className="text-muted-foreground mr-2 size-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(c.id)}>
                  <Trash2 className="text-muted-foreground mr-2 size-4 text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
