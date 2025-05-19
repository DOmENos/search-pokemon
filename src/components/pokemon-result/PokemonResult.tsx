"use client";

import { gql, useQuery } from "@apollo/client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Zap, ZapOff } from "lucide-react";
import {
  Attack,
  Evolution,
  Pokemon,
  Props,
  TypeColors,
} from "./PokemonResultType";
import GetPokemon from "@/graphql/get-pokemon-by-name";
import { useLazyQuery } from "@apollo/client";
import GetEvolutionPokemon from "@/graphql/get-pokemon-evolution";
import { useEffect, useState } from "react";

export default function PokemonResult({ name }: Props) {
  const [evolutionImages, setEvolutionImages] = useState<
    Record<string, string>
  >({});
  const [fetchPokemon] = useLazyQuery(GetEvolutionPokemon);
  const { loading, error, data } = useQuery(GetPokemon, {
    variables: { name },
    skip: !name,
  });

  useEffect(() => {
    const fetchImages = async () => {
      if (data?.pokemon?.evolutions?.length) {
        const results = await Promise.all(
          data.pokemon.evolutions.map(async (evo: { name: any; }) => {
            try {
              const { data: evolutionData } = await fetchPokemon({
                variables: { name: evo.name },
              });
              return {
                name: evo.name,
                image: evolutionData?.pokemon?.image || "/placeholder.svg",
              };
            } catch {
              return { name: evo.name, image: "/placeholder.svg" };
            }
          })
        );
        const imagesMap = results.reduce((acc, { name, image }) => {
          acc[name] = image;
          return acc;
        }, {} as Record<string, string>);
        setEvolutionImages(imagesMap);
      }
    };

    fetchImages();
  }, [data?.pokemon?.evolutions, fetchPokemon]);

  if (!name) return null;

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden border-4 border-yellow-400 bg-gradient-to-b from-red-500 to-red-600 shadow-xl">
        <CardHeader className="bg-white rounded-t-lg pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-4 w-32 mt-1" />
        </CardHeader>
        <CardContent className="pt-4 bg-white flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-200 rounded-full opacity-50"></div>
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </CardContent>
        <CardFooter className="bg-white rounded-b-lg pt-0 pb-4 flex flex-col items-center">
          <Skeleton className="h-8 w-full mt-4" />
          <Skeleton className="h-24 w-full mt-2" />
        </CardFooter>
      </Card>
    );
  }

  if (error || !data?.pokemon) {
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden border-4 border-gray-400 bg-gray-100 shadow-xl text-center p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-8 h-8 bg-gray-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <CardTitle className="text-xl">Pokémon Not Found</CardTitle>
          <CardDescription>
            Could not find any Pokémon named "{name}". Please check the spelling
            and try again.
          </CardDescription>
        </div>
      </Card>
    );
  }

  const pokemon: Pokemon = data.pokemon;
  const mainType = pokemon.types[0];
  const mainColor = TypeColors[mainType] || "bg-gray-400";

  return (
    <Card className={`w-full max-w-md mx-auto overflow-hidden border-4 border-yellow-400 bg-gradient-to-b from-red-500 to-red-600 shadow-xl ${mainColor}`}>
      <CardHeader className="bg-white rounded-t-lg pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{pokemon.name}</CardTitle>
          <Badge variant="outline" className="font-mono text-sm">
            #{pokemon.number}
          </Badge>
        </div>
        <CardDescription className="italic">
          {pokemon.classification}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 bg-white">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div
              className={`absolute inset-0 ${mainColor} rounded-full opacity-20 blur-md`}
            ></div>
            <div className="relative z-10">
              <img
                src={pokemon.image || "/placeholder.svg"}
                alt={pokemon.name}
                className="w-48 h-48 object-contain drop-shadow-lg"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            {pokemon.types.map((type) => (
              <Badge
                key={type}
                className={`${
                  TypeColors[type] || "bg-gray-400"
                } text-white px-3 py-1`}
              >
                {type}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="attacks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="attacks" className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Attacks
              </TabsTrigger>
              <TabsTrigger
                value="evolutions"
                className="flex items-center gap-1"
              >
                <ChevronRight className="h-4 w-4" />
                Evolutions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attacks" className="my-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold flex items-center gap-1 mb-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Fast Attacks
                  </h3>
                  <ul className="space-y-2">
                    {pokemon.attacks.fast.map((atk, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <span className="font-medium">{atk.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${
                              TypeColors[atk.type] || "bg-gray-400"
                            } text-white text-xs`}
                          >
                            {atk.type}
                          </Badge>
                          <span className="text-sm font-mono">
                            {atk.damage} dmg
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-bold flex items-center gap-1 mb-2">
                    <ZapOff className="h-4 w-4 text-purple-500" />
                    Special Attacks
                  </h3>
                  <ul className="space-y-2">
                    {pokemon.attacks.special.map((atk, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <span className="font-medium">{atk.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${
                              TypeColors[atk.type] || "bg-gray-400"
                            } text-white text-xs`}
                          >
                            {atk.type}
                          </Badge>
                          <span className="text-sm font-mono">
                            {atk.damage} dmg
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evolutions" className="my-4">
              {pokemon.evolutions?.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {pokemon.evolutions.map((evo) => (
                    <a
                      key={evo.id}
                      href={`/?name=${evo.name}`}
                      className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-16 h-16 mb-2">
                        <img
                          src={evolutionImages[evo.name] || "/placeholder.svg"}
                          alt={evo.name}
                          className="w-16 h-16 object-contain rounded-full border"
                        />
                      </div>
                      <span className="font-medium text-blue-600">
                        {evo.name}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>This Pokémon has no evolutions</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="bg-white rounded-b-lg pt-0 pb-4">
        <div className="w-full flex justify-center mt-2">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-2 border-black bg-[linear-gradient(to_bottom,theme(colors.red.500)_0%,theme(colors.red.500)_50%,theme(colors.white)_50%,theme(colors.white)_100%)] transition-transform duration-300">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-black z-10"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-20"></div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}