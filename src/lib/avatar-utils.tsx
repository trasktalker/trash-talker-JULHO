import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface IllustratedAvatar {
  id: string;
  name: string;
  svg: (className: string) => ReactNode;
}

export const ILLUSTRATED_AVATARS: IllustratedAvatar[] = [
  {
    id: "avatar_robot",
    name: "Robô Futurista",
    svg: (className: string) => (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Robô Futurista"
      >
        <title>Robô Futurista</title>
        <rect width="100" height="100" rx="50" fill="url(#avatar_robot_grad)" />
        <rect x="25" y="30" width="50" height="40" rx="10" fill="#E2E8F0" />
        <rect x="35" y="42" width="10" height="10" rx="5" fill="#3B82F6" />
        <rect x="55" y="42" width="10" height="10" rx="5" fill="#3B82F6" />
        <rect x="42" y="60" width="16" height="4" rx="2" fill="#475569" />
        <path
          d="M50 15V30"
          stroke="#E2E8F0"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="50" cy="15" r="4" fill="#EF4444" />
        <defs>
          <linearGradient
            id="avatar_robot_grad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1E3A8A" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "avatar_cat",
    name: "Gato Cool",
    svg: (className: string) => (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gato Cool"
      >
        <title>Gato Cool</title>
        <rect width="100" height="100" rx="50" fill="url(#avatar_cat_grad)" />
        {/* Ears */}
        <path d="M30 35L20 60H40L30 35Z" fill="#F87171" />
        <path d="M70 35L80 60H60L70 35Z" fill="#F87171" />
        {/* Face */}
        <circle cx="50" cy="62" r="26" fill="#F1F5F9" />
        {/* Eyes */}
        <ellipse cx="40" cy="58" rx="3" ry="5" fill="#1E293B" />
        <ellipse cx="60" cy="58" rx="3" ry="5" fill="#1E293B" />
        {/* Nose & Whiskers */}
        <path d="M50 65 L48 62 L52 62 Z" fill="#F87171" />
        <path
          d="M30 65H42M30 69H42M70 65H58M70 69H58"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="avatar_cat_grad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7F1D1D" />
            <stop offset="1" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "avatar_astronaut",
    name: "Astronauta",
    svg: (className: string) => (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Astronauta"
      >
        <title>Astronauta</title>
        <rect width="100" height="100" rx="50" fill="url(#avatar_astro_grad)" />
        {/* Helmet */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        {/* Visor */}
        <rect
          x="30"
          y="36"
          width="40"
          height="24"
          rx="12"
          fill="#1E293B"
          stroke="#60A5FA"
          strokeWidth="2"
        />
        {/* Visor shine */}
        <path
          d="M35 44C35 40 45 40 50 40"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="avatar_astro_grad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#311042" />
            <stop offset="1" stopColor="#701A75" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "avatar_ninja",
    name: "Ninja das Sombras",
    svg: (className: string) => (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Ninja das Sombras"
      >
        <title>Ninja das Sombras</title>
        <rect width="100" height="100" rx="50" fill="url(#avatar_ninja_grad)" />
        {/* Mask */}
        <circle cx="50" cy="50" r="30" fill="#1E293B" />
        {/* Eye Cutout */}
        <ellipse cx="50" cy="46" rx="22" ry="8" fill="#FFEDD5" />
        {/* Eyes */}
        <circle cx="42" cy="46" r="3" fill="#000000" />
        <circle cx="58" cy="46" r="3" fill="#000000" />
        <path
          d="M38 41L45 43M62 41L55 43"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Headband Ties */}
        <path
          d="M20 50L10 45M20 52L8 54"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="avatar_ninja_grad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0F172A" />
            <stop offset="1" stopColor="#334155" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "avatar_gamer",
    name: "Gamer Pro",
    svg: (className: string) => (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gamer Pro"
      >
        <title>Gamer Pro</title>
        <rect width="100" height="100" rx="50" fill="url(#avatar_gamer_grad)" />
        {/* Headphones */}
        <rect x="22" y="38" width="10" height="24" rx="5" fill="#10B981" />
        <rect x="68" y="38" width="10" height="24" rx="5" fill="#10B981" />
        <path
          d="M27 40C27 25 73 25 73 40"
          stroke="#10B981"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Face */}
        <circle cx="50" cy="52" r="20" fill="#FDE047" />
        {/* Cool Glasses */}
        <rect x="38" y="46" width="10" height="8" rx="2" fill="#1E293B" />
        <rect x="52" y="46" width="10" height="8" rx="2" fill="#1E293B" />
        <line
          x1="48"
          y1="50"
          x2="52"
          y2="50"
          stroke="#1E293B"
          strokeWidth="2"
        />
        {/* Smile */}
        <path
          d="M46 58C46 62 54 62 54 58"
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="avatar_gamer_grad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#064E3B" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "avatar_unicorn",
    name: "Unicórnio Mágico",
    svg: (className: string) => (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Unicórnio Mágico"
      >
        <title>Unicórnio Mágico</title>
        <rect
          width="100"
          height="100"
          rx="50"
          fill="url(#avatar_unicorn_grad)"
        />
        {/* Horn */}
        <path d="M50 15L44 40H56L50 15Z" fill="#FBBF24" />
        {/* Head */}
        <path d="M35 75C35 55 65 55 65 75" fill="#FFFFFF" />
        <path d="M35 75C35 55 50 50 50 75" fill="#F1F5F9" />
        {/* Eyes */}
        <circle cx="43" cy="65" r="2.5" fill="#F59E0B" />
        <circle cx="57" cy="65" r="2.5" fill="#F59E0B" />
        {/* Cheeks */}
        <circle cx="39" cy="70" r="3" fill="#F87171" opacity="0.5" />
        <circle cx="61" cy="70" r="3" fill="#F87171" opacity="0.5" />
        <defs>
          <linearGradient
            id="avatar_unicorn_grad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4C1D95" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export function renderAvatar(
  image: string | null | undefined,
  name: string,
  className = "size-8",
): ReactNode {
  if (image?.startsWith("avatar:")) {
    const avatarId = image.replace("avatar:", "");
    const avatar = ILLUSTRATED_AVATARS.find((a) => a.id === avatarId);
    if (avatar) {
      return avatar.svg(className);
    }
  }
  return (
    <Avatar className={className}>
      <AvatarImage src={image || ""} alt={name} />
      <AvatarFallback className="font-semibold bg-primary text-primary-foreground uppercase">
        {name ? name.substring(0, 2) : "??"}
      </AvatarFallback>
    </Avatar>
  );
}
