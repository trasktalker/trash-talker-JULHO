"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import { updateProfile } from "@/actions/account/update-profile";
import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  CameraIcon,
  Plus,
  X,
  Award,
  Globe,
  Shield,
  Pin,
  Sparkles,
  User,
  Hash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLocalProfile, saveLocalProfile } from "@/lib/profile-store";
import { ILLUSTRATED_AVATARS, renderAvatar } from "@/lib/avatar-utils";
import { AVAILABLE_BADGES } from "@/lib/badges-utils";

type UserProps = {
  name: string;
  email: string;
  image?: string | null;
};

const PREDEFINED_TAGS = [
  "Games",
  "Música",
  "Esportes",
  "Tecnologia",
  "Cinema",
  "Livros",
  "Comida",
  "Viagem",
  "Memes",
  "IA",
];

export function AccountForm({ user }: { user: UserProps }) {
  const [state, formAction, pending] = useActionState(updateProfile, {});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image ?? null,
  );

  // Client-side profile state (saved in localStorage)
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [language, setLanguage] = useState("pt");
  const [privacy, setPrivacy] = useState("public");
  const [pinnedBadges, setPinnedBadges] = useState<string[]>([]);

  // Load profile from localStorage on mount
  useEffect(() => {
    const local = getLocalProfile();
    setDisplayName(local.displayName ?? user.name);
    setBio(local.bio ?? "");
    setInterests(local.interests ?? []);
    setLanguage(local.language ?? "pt");
    setPrivacy(local.privacy ?? "public");
    setPinnedBadges(local.pinnedBadges ?? []);
  }, [user.name]);

  useEffect(() => {
    if (state.success) {
      saveLocalProfile({
        displayName: displayName || user.name,
        bio,
        interests,
        language,
        privacy,
        pinnedBadges,
      });
      window.location.reload();
    }
  }, [
    state.success,
    displayName,
    bio,
    interests,
    language,
    privacy,
    pinnedBadges,
    user.name,
  ]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectIllustratedAvatar = (avatarId: string) => {
    setImagePreview(`avatar:${avatarId}`);
  };

  const handleAddCustomTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleToggleTag = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests((prev) => prev.filter((t) => t !== tag));
    } else {
      setInterests((prev) => [...prev, tag]);
    }
  };

  const handleRemoveInterest = (tag: string) => {
    setInterests((prev) => prev.filter((t) => t !== tag));
  };

  const handleToggleBadgePin = (badgeId: string) => {
    setPinnedBadges((prev) => {
      if (prev.includes(badgeId)) {
        return prev.filter((id) => id !== badgeId);
      }
      if (prev.length >= 3) {
        return prev; // limit to 3 pinned badges
      }
      return [...prev, badgeId];
    });
  };

  const bioPercent = Math.round((bio.length / 160) * 100);

  return (
    <form action={formAction} className="flex flex-col gap-0 w-full">
      {state.error && (
        <div className="text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-lg border border-destructive/20 mb-6">
          {state.error}
        </div>
      )}

      {/* ═══════════ HERO BANNER ═══════════ */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-accent/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Title on top of banner */}
        <div className="absolute top-6 left-8 z-10">
          <h1 className="text-2xl font-bold tracking-tight text-primary-foreground drop-shadow-sm">
            Personalizar Perfil
          </h1>
          <p className="text-sm text-primary-foreground/80 mt-1">
            Defina como os outros te veem no Trash Talker
          </p>
        </div>

        {/* Save button in banner */}
        <div className="absolute top-6 right-8 z-10 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-5 font-semibold bg-background/20 backdrop-blur-md border-white/20 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground"
            onClick={() => {
              setImagePreview(user.image ?? null);
              const local = getLocalProfile();
              setDisplayName(local.displayName ?? user.name);
              setBio(local.bio ?? "");
              setInterests(local.interests ?? []);
              setLanguage(local.language ?? "pt");
              setPrivacy(local.privacy ?? "public");
              setPinnedBadges(local.pinnedBadges ?? []);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={pending}
            className="rounded-full px-5 font-semibold bg-background text-foreground hover:bg-background/90 shadow-lg"
          >
            {pending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* ═══════════ AVATAR (Overlapping Banner) ═══════════ */}
      <div className="relative z-10 flex items-end gap-6 px-8 -mt-14">
        <button
          type="button"
          className="relative group cursor-pointer rounded-full border-4 border-background bg-background p-0 outline-hidden shadow-xl shrink-0"
          onClick={handleImageClick}
        >
          {renderAvatar(imagePreview, user.name, "size-28")}
          <div className="absolute bottom-1 right-1 bg-primary border-[3px] border-background p-1.5 rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors shadow-md">
            <CameraIcon className="size-4 text-primary-foreground" />
          </div>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input type="hidden" name="image" value={imagePreview || ""} />

        {/* Avatar Choices - Inline next to the avatar */}
        <div className="flex items-center gap-3 pb-2">
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Escolher avatar:
          </span>
          <div className="flex gap-1.5">
            {ILLUSTRATED_AVATARS.map((avatar) => {
              const isSelected = imagePreview === `avatar:${avatar.id}`;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => selectIllustratedAvatar(avatar.id)}
                  className={`relative rounded-full overflow-hidden border-2 transition-all p-0.5 hover:scale-110 active:scale-95 ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/30 scale-110"
                      : "border-border hover:border-primary/50"
                  }`}
                  title={avatar.name}
                >
                  {avatar.svg("size-9")}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ MAIN CONTENT GRID ═══════════ */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* ─── Left Column (7 cols) ─── */}
        <div className="col-span-7 flex flex-col gap-6">
          {/* Card: Identity */}
          <div className="bg-card border border-border/60 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <User className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground tracking-tight">
                Identificação
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Nome da Conta */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="name"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Nome da Conta
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  required
                  className="bg-background/60 h-10"
                />
                <span className="text-[10px] text-muted-foreground">
                  Salvo no banco de dados
                </span>
              </div>

              {/* Nome de Exibição */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="displayName"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Apelido / Nome de Exibição
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Como quer ser chamado"
                  className="bg-background/60 h-10"
                />
                <span className="text-[10px] text-muted-foreground">
                  Visível para outros usuários
                </span>
              </div>
            </div>

            {/* Email - read only */}
            <div className="mt-4 flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-muted-foreground"
              >
                Nome de Usuário
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email.split("@")[0]}
                disabled
                className="bg-muted/50 text-muted-foreground cursor-not-allowed border-dashed max-w-xs h-10"
              />
            </div>
          </div>

          {/* Card: Bio */}
          <div className="bg-card border border-border/60 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground tracking-tight">
                  Bio Curta
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {bio.length}/160
                </span>
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${bioPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value.substring(0, 160))}
              placeholder="Descreva quem você é em poucas palavras... Ex: Gamer, amante de café e pizza 🍕"
              rows={3}
              className="bg-background/60 resize-none text-sm"
            />
          </div>

          {/* Card: Interesses */}
          <div className="bg-card border border-border/60 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground tracking-tight">
                Interesses & Tags
              </h2>
            </div>

            {/* Tags Ativas */}
            <div className="flex flex-wrap gap-2 p-3 bg-background/40 border border-border/40 rounded-lg min-h-[48px] items-center mb-4">
              {interests.length > 0 ? (
                interests.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1.5 py-1 pl-3 pr-1.5 rounded-full text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(tag)}
                      className="rounded-full hover:bg-destructive/10 p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  Nenhum interesse adicionado. Selecione abaixo ou digite um
                  novo.
                </span>
              )}
            </div>

            {/* Input para custom tag */}
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Adicionar interesse customizado..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomTag();
                  }
                }}
                className="bg-background/60 h-9"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 shrink-0"
                onClick={handleAddCustomTag}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Tags Recomendadas */}
            <div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Sugestões
              </span>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_TAGS.map((tag) => {
                  const isActive = interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                        isActive
                          ? "bg-primary/15 text-primary border-primary/30"
                          : "bg-background/60 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Column (5 cols) ─── */}
        <div className="col-span-5 flex flex-col gap-6">
          {/* Card: Configurações */}
          <div className="bg-card border border-border/60 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground tracking-tight mb-5">
              Configurações
            </h2>

            <div className="flex flex-col gap-4">
              {/* Idioma */}
              <div className="flex items-center gap-4 p-3 bg-background/40 rounded-lg border border-border/40">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <Label
                    htmlFor="language"
                    className="text-xs font-medium text-foreground block mb-1"
                  >
                    Idioma Preferido
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger
                      id="language"
                      className="w-full bg-background/60 h-8 text-xs"
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Privacidade */}
              <div className="flex items-center gap-4 p-3 bg-background/40 rounded-lg border border-border/40">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <Label
                    htmlFor="privacy"
                    className="text-xs font-medium text-foreground block mb-1"
                  >
                    Privacidade do Perfil
                  </Label>
                  <Select value={privacy} onValueChange={setPrivacy}>
                    <SelectTrigger
                      id="privacy"
                      className="w-full bg-background/60 h-8 text-xs"
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="connections">Conexões</SelectItem>
                      <SelectItem value="private">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Badges */}
          <div className="bg-card border border-border/60 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground tracking-tight">
                  Conquistas & Badges
                </h2>
              </div>
            </div>

            {/* Pinned Badges Slots */}
            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Pin className="size-3 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Fixados no Perfil ({pinnedBadges.length}/3)
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map((slotIndex) => {
                  const badgeId = pinnedBadges[slotIndex];
                  const badge = badgeId
                    ? AVAILABLE_BADGES.find((b) => b.id === badgeId)
                    : null;
                  return (
                    <div
                      key={`slot-${slotIndex}`}
                      className={`flex items-center justify-center size-14 rounded-xl border-2 border-dashed transition-all ${
                        badge
                          ? "border-primary/40 bg-primary/5"
                          : "border-border/60 bg-background/30"
                      }`}
                    >
                      {badge ? (
                        <span className="text-2xl" title={badge.name}>
                          {badge.icon}
                        </span>
                      ) : (
                        <Plus className="size-4 text-muted-foreground/40" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Badges List */}
            <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
              {AVAILABLE_BADGES.map((badge) => {
                const isPinned = pinnedBadges.includes(badge.id);
                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => handleToggleBadgePin(badge.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all group ${
                      isPinned
                        ? "bg-primary/5 border-primary/30 shadow-xs"
                        : "bg-background/30 border-border/50 hover:border-primary/20 hover:bg-background/60"
                    }`}
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {badge.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          {badge.name}
                        </span>
                        {isPinned && (
                          <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full border border-primary/20">
                            Fixado
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {badge.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[10px] text-muted-foreground text-center mt-3">
              Clique em um selo para fixá-lo ou desafixá-lo ao lado do seu nome.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
