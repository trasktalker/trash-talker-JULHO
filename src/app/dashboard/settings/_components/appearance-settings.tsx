"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { AlertTriangle } from "lucide-react";

export function AppearanceSettings() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">Aparência</h2>
        <p className="text-xs text-muted-foreground">
          Personalize as cores e o tema visual da aplicação.
        </p>
        <ThemeToggle />
      </div>

      {/* Zona de Perigo */}
      <div className="bg-card border border-destructive/30 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-destructive flex items-center gap-2">
          <AlertTriangle className="size-4" />
          Zona de Perigo
        </h2>
        <p className="text-xs text-muted-foreground">
          Ações irreversíveis na sua conta.
        </p>
        <div className="border border-destructive/20 rounded-lg p-4 flex items-center justify-between bg-destructive/5">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-foreground">
              Excluir Conta
            </span>
            <span className="text-[11px] text-muted-foreground">
              Apaga permanentemente sua conta e todos os dados associados.
            </span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="text-xs"
            onClick={() => alert("Funcionalidade em desenvolvimento")}
          >
            Excluir Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
