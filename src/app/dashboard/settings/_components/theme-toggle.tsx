"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-4 p-4 border rounded-md bg-card">
      <div className="flex flex-col gap-1 flex-1">
        <span className="font-medium">Tema do aplicativo</span>
        <span className="text-sm text-muted-foreground">
          Alterne entre o tema claro e escuro.
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("light")}
          className="gap-2"
        >
          <Sun className="h-4 w-4" />
          Claro
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("dark")}
          className="gap-2"
        >
          <Moon className="h-4 w-4" />
          Escuro
        </Button>
      </div>
    </div>
  );
}
