export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Evolution {
  id: string;
  name: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  classification: string;
  types: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions: Evolution[];
}

export interface Props {
  name: string;
}

export const TypeColors: Record<string, string> = {
    Normal: "bg-gray-400",
    Fire: "bg-orange-500",
    Water: "bg-blue-500",
    Electric: "bg-yellow-400",
    Grass: "bg-green-500",
    Ice: "bg-blue-200",
    Fighting: "bg-red-700",
    Poison: "bg-purple-500",
    Ground: "bg-amber-600",
    Flying: "bg-indigo-300",
    Psychic: "bg-pink-500",
    Bug: "bg-lime-500",
    Rock: "bg-stone-500",
    Ghost: "bg-purple-700",
    Dragon: "bg-indigo-700",
    Dark: "bg-gray-800",
    Steel: "bg-slate-400",
    Fairy: "bg-pink-300",
  };
