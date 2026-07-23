"use client";

import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/actions/logout";
import { useActionState, useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getLocalProfile } from "@/lib/profile-store";
import { AVAILABLE_BADGES } from "@/lib/badges-utils";
import { renderAvatar } from "@/lib/avatar-utils";

export function NavUser({
  user: _user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const [state, logoutAction, pending] = useActionState(logout, {});

  // Example of how to use the useSession hook in client-side components
  const session = useSession();

  // Local profile states
  const [displayName, setDisplayName] = useState("");
  const [pinnedBadgeIds, setPinnedBadgeIds] = useState<string[]>([]);

  useEffect(() => {
    const syncProfile = () => {
      const local = getLocalProfile();
      setDisplayName(local.displayName || session.data?.user.name || "User");
      setPinnedBadgeIds(local.pinnedBadges || []);
    };

    syncProfile();

    window.addEventListener("profile-updated", syncProfile);
    return () => {
      window.removeEventListener("profile-updated", syncProfile);
    };
  }, [session.data]);

  const pinnedBadges = AVAILABLE_BADGES.filter((b) =>
    pinnedBadgeIds.includes(b.id),
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {renderAvatar(
                session.data?.user.image,
                session.data?.user.name || "",
                "h-8 w-8",
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="truncate font-medium">{displayName}</span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {pinnedBadges.map((badge) => (
                      <span
                        key={badge.id}
                        title={`${badge.name}: ${badge.description}`}
                        className="cursor-help text-xs"
                      >
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground truncate text-xs">
                  {session.data?.user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {renderAvatar(
                  session.data?.user.image,
                  session.data?.user.name || "",
                  "h-8 w-8",
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="truncate font-medium">{displayName}</span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {pinnedBadges.map((badge) => (
                        <span
                          key={badge.id}
                          title={`${badge.name}: ${badge.description}`}
                          className="cursor-help text-xs"
                        >
                          {badge.icon}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-muted-foreground truncate text-xs">
                    {session.data?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account">
                  <IconUserCircle />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <button type="submit" disabled={pending} className="w-full">
                <DropdownMenuItem disabled={pending}>
                  {pending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <IconLogout />
                  )}
                  Log out
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
