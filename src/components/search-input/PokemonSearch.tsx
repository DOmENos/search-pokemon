"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useQuery } from "@apollo/client"
import RandomSuggestPokemon from "@/graphql/random-suggest-pokemon"

export default function PokemonSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [term, setTerm] = useState(searchParams?.get("name") || "")
  const [isHovered, setIsHovered] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { loading, error, data } = useQuery(RandomSuggestPokemon, {
    variables: { count: 200 },
  })

  useEffect(() => {
    if (data?.pokemons) {
      const pokemonArray = [...data.pokemons]
      const randomPokemons = pokemonArray
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((pokemon: { name: string }) => pokemon.name)
      setSuggestions(randomPokemons)
    }
  }, [data])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (term.trim()) {
      router.push(`/?name=${encodeURIComponent(term.trim())}`)
    }
  }

  const PokeballIcon = ({ isHovered = false }: { isHovered?: boolean }) => (
    <div className="relative w-5 h-5">
      <div
        className={`absolute inset-0 rounded-full border-2 border-black transition-transform duration-300 ${
          isHovered ? "animate-spin" : ""
        } bg-[linear-gradient(to_bottom,theme(colors.red.500)_0%,theme(colors.red.500)_50%,theme(colors.white)_50%,theme(colors.white)_100%)]`}
      >
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-black z-10"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-20"></div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-yellow-500 mb-2">กำลังโหลดรายชื่อโปเกมอน...</h3>
          <p className="text-gray-600">กรุณารอสักครู่ เรากำลังค้นหาโปเกมอนที่ดีที่สุดให้คุณ!</p>
        </div>

        <div className="flex justify-center items-center gap-4 my-6">
          {[...Array(1)].map((_, i) => (
            <div
              key={i}
              className="relative w-12 h-12 animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            >
              <div
                className={`absolute inset-0 rounded-full border-2 border-black animate-spin bg-[linear-gradient(to_bottom,theme(colors.red.500)_0%,theme(colors.red.500)_50%,theme(colors.white)_50%,theme(colors.white)_100%)]`}
                style={{ animationDuration: `${1 + i * 0.5}s` }}
              >
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black"></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-black z-10"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโปเกมอน:", error)
    return <div>เกิดข้อผิดพลาดในการโหลดคำแนะนำโปเกมอน</div>
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-6 relative">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search className="h-5 w-5" />
        </div>

        <Input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter Pokémon name..."
          className="pl-10 pr-24 py-6 border-2 border-yellow-400 rounded-full shadow-md focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
        />

        <Button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute right-1 bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full px-4 py-2 h-10 transition-all duration-200 hover:shadow-lg border-2 border-yellow-400"
        >
          <span className="mr-2">Search</span>
          <PokeballIcon isHovered={isHovered} />
        </Button>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setTerm(suggestion)
              router.push(`/?name=${suggestion}`)
            }}
            className="rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-xs px-3"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </form>
  )
}
