"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function PokemonSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [term, setTerm] = useState(searchParams?.get("name") || "")
  const [isHovered, setIsHovered] = useState(false)

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
  );

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
        {["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Eevee"].map((suggestion) => (
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
