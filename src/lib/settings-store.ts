"use client";

export interface LocalSettings {
  tone: "casual" | "formal" | "humorous";
  suggestionFrequency: "low" | "medium" | "high";
  contentFilter: "light" | "moderate" | "restricted";
  notifications: {
    suggestions: boolean;
    messages: boolean;
    events: boolean;
  };
  memoryEnabled: boolean;
  dataAccess: "interactions" | "profile" | "all";
  responseLanguage: "profile" | "pt" | "en" | "es";
}

const SETTINGS_STORAGE_KEY = "trash-talker-local-settings";

export const DEFAULT_SETTINGS: LocalSettings = {
  tone: "casual",
  suggestionFrequency: "medium",
  contentFilter: "moderate",
  notifications: {
    suggestions: true,
    messages: true,
    events: true,
  },
  memoryEnabled: true,
  dataAccess: "profile",
  responseLanguage: "profile",
};

export function getLocalSettings(): LocalSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!data) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(data);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(parsed.notifications || {}),
      },
    };
  } catch (e) {
    console.error("Failed to load local settings:", e);
    return DEFAULT_SETTINGS;
  }
}

export function saveLocalSettings(settings: LocalSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(
      new CustomEvent("settings-updated", { detail: settings }),
    );
  } catch (e) {
    console.error("Failed to save local settings:", e);
  }
}

export function resetAIMemory(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // Apaga a memória armazenada da IA no localStorage
    localStorage.removeItem("trash-talker-ai-memory");
    window.dispatchEvent(new CustomEvent("ai-memory-reset"));
    return true;
  } catch (e) {
    console.error("Failed to reset AI memory:", e);
    return false;
  }
}
