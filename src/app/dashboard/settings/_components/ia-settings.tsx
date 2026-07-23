"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type LocalSettings,
  resetAIMemory,
} from "@/lib/settings-store";
import {
  MessageSquare,
  Languages,
  Brain,
  RotateCcw,
  Check,
} from "lucide-react";

interface IASettingsProps {
  settings: LocalSettings;
  updateSetting: <K extends keyof LocalSettings>(key: K, value: LocalSettings[K]) => void;
}

export function IASettings({ settings, updateSetting }: IASettingsProps) {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetMemory = () => {
    if (
      window.confirm(
        "Tem certeza que deseja resetar a memória da IA? O histórico e preferências aprendidas serão apagados.",
      )
    ) {
      resetAIMemory();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Tom de Conversa */}
        <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">
              Tom de Conversa
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Altera o vocabulário e o estilo das respostas da IA em todas as interações.
          </p>
          <Select
            value={settings.tone}
            onValueChange={(val) =>
              updateSetting("tone", val as LocalSettings["tone"])
            }
          >
            <SelectTrigger className="w-full bg-background/60">
              <SelectValue placeholder="Selecione o tom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="humorous">Bem-humorado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Card: Idioma de Resposta */}
        <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Languages className="size-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">
              Idioma de Resposta
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Força a IA a responder sempre no idioma selecionado.
          </p>
          <Select
            value={settings.responseLanguage}
            onValueChange={(val) =>
              updateSetting(
                "responseLanguage",
                val as LocalSettings["responseLanguage"],
              )
            }
          >
            <SelectTrigger className="w-full bg-background/60">
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile">Seguir idioma do perfil</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Card Largo: Memória e Aprendizado */}
      <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Brain className="size-4 text-primary" />
              <Label className="text-sm font-semibold text-foreground">
                Memória e Aprendizado
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Permite que a IA lembre histórico e preferências. O reset apaga o aprendizado.
            </p>
          </div>
          <Switch
            checked={settings.memoryEnabled}
            onCheckedChange={(checked) => updateSetting("memoryEnabled", checked)}
          />
        </div>

        <div className="pt-3 border-t border-border/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-foreground">
              Resetar Memória da IA
            </span>
            <span className="text-[11px] text-muted-foreground">
              Apaga todo o histórico de aprendizado acumulado sobre você.
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetMemory}
            className="gap-2 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            {resetSuccess ? (
              <>
                <Check className="size-3 text-green-500" />
                Memória Apagada!
              </>
            ) : (
              <>
                <RotateCcw className="size-3" />
                Resetar Memória
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
