"use client"

import type { SearchResult } from "@/types/recipe"
import RecipeCard from "./recipe-card"

interface RecipeListProps {
  recipes: SearchResult[]
  selectedRecipeId: string | null
  onSelectRecipe: (id: string) => void
}

export default function RecipeList({ recipes, selectedRecipeId, onSelectRecipe }: RecipeListProps) {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {recipes.length === 0 ? (
        <div className="flex items-center justify-center flex-1 p-4 text-gray-500">
          No recipes found. Try another search.
        </div>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isActive={recipe.id === selectedRecipeId}
            onClick={() => onSelectRecipe(recipe.id)}
          />
        ))
      )}
    </div>
  )
}
