"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getLocalSettings,
  saveLocalSettings,
  type LocalSettings,
} from "@/lib/settings-store";
import { IASettings } from "./ia-settings";
import { NotificationsSettings } from "./notifications-settings";
import { AppearanceSettings } from "./appearance-settings";
import { Sparkles, Bell, Palette } from "lucide-react";

export function SettingsForm() {
  const [settings, setSettings] = useState<LocalSettings>(getLocalSettings());

  useEffect(() => {
    setSettings(getLocalSettings());
  }, []);

  const updateSetting = <K extends keyof LocalSettings>(
    key: K,
    value: LocalSettings[K],
  ) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveLocalSettings(updated);
  };

  const updateNotification = (
    key: keyof LocalSettings["notifications"],
    value: boolean,
  ) => {
    const updated: LocalSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    };
    setSettings(updated);
    saveLocalSettings(updated);
  };

  return (
    <Tabs defaultValue="ia" className="w-full">
      <TabsList className="mb-6 bg-muted/60 p-1 rounded-xl">
        <TabsTrigger value="ia" className="rounded-lg gap-2">
          <Sparkles className="size-4" />
          Comportamento da IA
        </TabsTrigger>
        <TabsTrigger value="notificacoes" className="rounded-lg gap-2">
          <Bell className="size-4" />
          Notificações & Privacidade
        </TabsTrigger>
        <TabsTrigger value="aparencia" className="rounded-lg gap-2">
          <Palette className="size-4" />
          Aparência & Conta
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ia">
        <IASettings settings={settings} updateSetting={updateSetting} />
      </TabsContent>

      <TabsContent value="notificacoes">
        <NotificationsSettings
          settings={settings}
          updateSetting={updateSetting}
          updateNotification={updateNotification}
        />
      </TabsContent>

      <TabsContent value="aparencia">
        <AppearanceSettings />
      </TabsContent>
    </Tabs>
  );
}
