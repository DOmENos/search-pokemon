import PokemonSearch from "@/components/search-input/PokemonSearch";
import PokemonResult from "@/components/pokemon-result/PokemonResult";
import { useSearchParams } from "next/navigation";
import PokemonCard from "@/components/sample-pokemon/PokemonCard";
import RandomSuggestPokemon from "@/graphql/random-suggest-pokemon";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const shuffleArray = (arr: any[]) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function Page() {
  const searchParams = useSearchParams();
  const pokemonName = searchParams?.get("name") || "";

  const { loading, error, data } = useQuery(RandomSuggestPokemon, {
    variables: { count: 100 },
  });

  const renderSkeletonCard = () => (
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24">
      <div className="w-full max-w-md mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Pokédex
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Search for any Pokémon to see its details
        </p>
        <PokemonSearch />
      </div>

      {!pokemonName ? (
        <>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>{renderSkeletonCard()}</div>
              ))}
            </div>
          ) : error ? (
            <p>Error loading suggestions.</p>
          ) : (
            <Carousel className="mx-auto w-full max-w-6xl">
              <CarouselContent className="gap-4">
                {shuffleArray(data.pokemons)
                  .slice(0, 10)
                  .map((pokemon: { name: string }, index) => (
                    <CarouselItem
                      key={index}
                      className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="p-1">
                        <PokemonCard name={pokemon.name} />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-2 py-4">
                <CarouselPrevious className="border rounded-full w-8 h-8 flex items-center justify-center" />
                <CarouselNext className="border rounded-full w-8 h-8 flex items-center justify-center" />
              </div>
            </Carousel>
          )}
        </>
      ) : (
        <PokemonResult name={pokemonName} />
      )}
    </main>
  );
}
