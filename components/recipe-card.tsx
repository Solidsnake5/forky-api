"use client"

import Image from "next/image"
import type { SearchResult } from "@/types/recipe"

interface RecipeCardProps {
  recipe: SearchResult
  isActive: boolean
  onClick: () => void
}

export default function RecipeCard({ recipe, isActive, onClick }: RecipeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-4 text-left transition-colors border-b hover:bg-amber-50 ${
        isActive ? "bg-amber-50" : ""
      }`}
    >
      <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-full">
        <Image
          src={recipe.image_url || "/placeholder.svg"}
          alt={recipe.title}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="overflow-hidden">
        <h3 className="font-medium text-amber-600 truncate uppercase">{recipe.title}</h3>
        <p className="text-sm text-gray-400 uppercase">ALL RECIPES</p>
      </div>
    </button>
  )
}
