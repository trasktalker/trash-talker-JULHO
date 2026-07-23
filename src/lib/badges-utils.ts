export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji
  color: string; // Tailwind class
}

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: "conversas_100",
    name: "Conversador",
    description: "Mais de 100 conversas com a IA",
    icon: "💬",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "membro_1_ano",
    name: "Pioneiro",
    description: "Membro há mais de 1 ano",
    icon: "👑",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: "tagarela",
    name: "Tagarela",
    description: "Enviou mais de 500 mensagens",
    icon: "🗣️",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    id: "coruja",
    name: "Coruja",
    description: "Ativo durante a madrugada",
    icon: "🦉",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "zoeiro",
    name: "Zoador",
    description: "Domina a arte do Trash Talk",
    icon: "🔥",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  {
    id: "foco_total",
    name: "Foco Total",
    description: "Usou a IA por 5 dias seguidos",
    icon: "⚡",
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
];
