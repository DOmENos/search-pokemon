"use client";

import { useQuery } from "@apollo/client";
import GetPokemon from "@/graphql/get-pokemon-by-name";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { PokemonCardProps, TypeColors } from "./PokemonCardType";



const PokemonCard = ({ name }: PokemonCardProps) => {
  const { data, loading, error } = useQuery(GetPokemon, {
    variables: { name },
  });

  const router = useRouter();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 w-full max-w-xs">
        <div className="p-4 flex justify-center bg-gray-100 dark:bg-gray-900">
          <Skeleton className="h-32 w-32 rounded-md" />
        </div>
        <div className="p-5">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl overflow-hidden shadow border border-red-200 dark:border-red-800 p-4 w-full max-w-xs">
        <p className="text-red-600 dark:text-red-400 font-medium">
          Error loading {name}
        </p>
      </div>
    );
  }

  const pokemon = data.pokemon;

  return (
    <div
      onClick={() => router.push(`/?name=${pokemon.name}`)}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 w-full max-w-xs"
    >
      <div className="p-4 flex justify-center items-center bg-gray-100 dark:bg-gray-900 relative h-48">
        {pokemon.image && (
          <Image
            src={pokemon.image || "/placeholder.svg"}
            alt={pokemon.name}
            width={150}
            height={150}
            className="object-contain h-full w-auto drop-shadow-md hover:scale-110 transition-transform duration-300"
          />
        )}
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold">
          #{pokemon.number}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold capitalize mb-1 text-gray-800 dark:text-gray-100">
          {pokemon.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {pokemon.classification}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {pokemon.types.map((type: string) => (
            <span
              key={type}
              className={`${
                TypeColors[type] || TypeColors.default
              } text-white text-xs font-medium px-2.5 py-1 rounded-full`}
            >
              {type}
            </span>
          ))}
        </div>

        {pokemon.maxHP && (
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              HP:
            </span>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${Math.min(100, (pokemon.maxHP / 150) * 100)}%`,
                }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {pokemon.maxHP}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
