import Image from "next/image"
import { Clock, Users, Bookmark, Minus, Plus } from "lucide-react"
import type { Recipe } from "@/types/recipe"

interface RecipeDetailProps {
  recipe: Recipe
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-64">
        <Image src={recipe.image_url || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-amber-700/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white uppercase">{recipe.title}</h1>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-amber-100">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium">
            <span className="font-bold">{recipe.cooking_time}</span> MINUTES
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium">
            <span className="font-bold">{recipe.servings}</span> SERVINGS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-full bg-amber-200 text-amber-600">
            <Minus className="w-4 h-4" />
          </button>
          <button className="p-1 rounded-full bg-amber-200 text-amber-600">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button className="p-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-white">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-amber-600">RECIPE INGREDIENTS</h2>
          <ul className="grid gap-2 md:grid-cols-2">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>
                  {ing.quantity && <span className="font-medium">{ing.quantity} </span>}
                  {ing.unit && <span className="font-medium">{ing.unit} </span>}
                  {ing.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-amber-600">HOW TO COOK IT</h2>
          <p className="mb-4 text-gray-700">
            This recipe was carefully designed and tested by <span className="font-medium">{recipe.publisher}</span>.
            Please check out directions at their website.
          </p>
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-medium text-white transition-colors rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
          >
            DIRECTIONS →
          </a>
        </div>
      </div>
    </div>
  )
}
