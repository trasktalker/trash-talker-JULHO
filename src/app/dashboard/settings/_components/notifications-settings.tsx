"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LocalSettings } from "@/lib/settings-store";
import { Bell, ShieldCheck, Database } from "lucide-react";

interface NotificationsSettingsProps {
  settings: LocalSettings;
  updateSetting: <K extends keyof LocalSettings>(key: K, value: LocalSettings[K]) => void;
  updateNotification: (key: keyof LocalSettings["notifications"], value: boolean) => void;
}

export function NotificationsSettings({
  settings,
  updateSetting,
  updateNotification,
}: NotificationsSettingsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Frequência de Sugestões */}
        <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">
              Frequência de Sugestões
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Controla a quantidade de notificações e sugestões enviadas pela IA.
          </p>
          <Select
            value={settings.suggestionFrequency}
            onValueChange={(val) =>
              updateSetting(
                "suggestionFrequency",
                val as LocalSettings["suggestionFrequency"],
              )
            }
          >
            <SelectTrigger className="w-full bg-background/60">
              <SelectValue placeholder="Selecione a frequência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Card: Filtro de Conteúdo */}
        <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">
              Filtro de Conteúdo
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Define a restrição de temas sensíveis em chats e sugestões.
          </p>
          <Select
            value={settings.contentFilter}
            onValueChange={(val) =>
              updateSetting(
                "contentFilter",
                val as LocalSettings["contentFilter"],
              )
            }
          >
            <SelectTrigger className="w-full bg-background/60">
              <SelectValue placeholder="Selecione o filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Leve</SelectItem>
              <SelectItem value="moderate">Moderado</SelectItem>
              <SelectItem value="restricted">Restrito</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Card Largo: Notificações por Categoria */}
      <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="size-4 text-primary" />
          <div className="flex flex-col">
            <Label className="text-sm font-semibold text-foreground">
              Categorias de Notificação
            </Label>
            <p className="text-xs text-muted-foreground">
              Ativa ou desativa alertas por categoria individualmente.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-3 bg-background/40 rounded-lg border border-border/40">
            <span className="text-xs font-medium text-foreground">
              Sugestões de Conversa
            </span>
            <Switch
              checked={settings.notifications.suggestions}
              onCheckedChange={(checked) =>
                updateNotification("suggestions", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-background/40 rounded-lg border border-border/40">
            <span className="text-xs font-medium text-foreground">
              Novas Mensagens
            </span>
            <Switch
              checked={settings.notifications.messages}
              onCheckedChange={(checked) =>
                updateNotification("messages", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-background/40 rounded-lg border border-border/40">
            <span className="text-xs font-medium text-foreground">
              Eventos e Novidades
            </span>
            <Switch
              checked={settings.notifications.events}
              onCheckedChange={(checked) => updateNotification("events", checked)}
            />
          </div>
        </div>
      </div>

      {/* Card: Controle de Dados */}
      <div className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-primary" />
          <Label className="text-sm font-semibold text-foreground">
            Controle de Acesso a Dados
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Define o nível de acesso aos seus dados para gerar recomendações.
        </p>
        <Select
          value={settings.dataAccess}
          onValueChange={(val) =>
            updateSetting("dataAccess", val as LocalSettings["dataAccess"])
          }
        >
          <SelectTrigger className="w-full bg-background/60">
            <SelectValue placeholder="Selecione o nível de acesso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="interactions">Apenas interações</SelectItem>
            <SelectItem value="profile">Interações + Perfil</SelectItem>
            <SelectItem value="all">Acesso Total (Recomendado)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
