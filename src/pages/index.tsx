import PokemonSearch from "@/components/search-input/PokemonSearch";
import PokemonResult from "@/components/pokemon-result/PokemonResult";
import { useSearchParams } from "next/navigation";
import PokemonCard from "@/components/sample-pokemon/PokemonCard";

export default function Page() {
  const searchParams = useSearchParams();
  const pokemonName = searchParams?.get("name") || "";
  const starterPokemons = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24">
      <div className="w-full max-w-md mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Pokédex</h1>
        <p className="text-gray-500 text-center mb-6">
          Search for any Pokémon to see its details
        </p>
        <PokemonSearch />
      </div>

      {!pokemonName ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {starterPokemons.map((name) => (
            <PokemonCard key={name} name={name} />
          ))}
        </div>
      ) : (
        <PokemonResult name={pokemonName} />
      )}
    </main>
  );
}
