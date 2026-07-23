"use client";

export interface LocalProfile {
  displayName?: string;
  bio?: string;
  interests?: string[];
  language?: string;
  privacy?: string;
  pinnedBadges?: string[];
}

const STORAGE_KEY = "trash-talker-local-profile";

export function getLocalProfile(): LocalProfile {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Failed to load local profile:", e);
    return {};
  }
}

export function saveLocalProfile(profile: LocalProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(
      new CustomEvent("profile-updated", { detail: profile }),
    );
  } catch (e) {
    console.error("Failed to save local profile:", e);
  }
}
