export interface PokemonCardProps {
  name: string;
}

export const TypeColors: Record<string, string> = {
  Normal: "bg-gray-400",
  Fire: "bg-orange-500",
  Water: "bg-blue-500",
  Electric: "bg-yellow-400",
  Grass: "bg-green-500",
  Ice: "bg-cyan-300",
  Fighting: "bg-red-700",
  Poison: "bg-purple-600",
  Ground: "bg-amber-600",
  Flying: "bg-indigo-300",
  Psychic: "bg-pink-500",
  Bug: "bg-lime-500",
  Rock: "bg-stone-600",
  Ghost: "bg-violet-700",
  Dragon: "bg-violet-900",
  Dark: "bg-stone-800",
  Steel: "bg-slate-400",
  Fairy: "bg-pink-300",
  default: "bg-gray-500",
};