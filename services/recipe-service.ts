import type { RecipeResponse, SearchResponse } from "@/types/recipe"

const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes"
const API_KEY = "e4e9f249-7658-4ee0-b46e-5ea99dab82fd"

export async function searchRecipes(query: string) {
  try {
    const response = await fetch(`${API_URL}?search=${query}&key=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data: SearchResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error searching recipes:", error)
    throw error
  }
}

export async function getRecipe(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data: RecipeResponse = await response.json()
    return data.data.recipe
  } catch (error) {
    console.error("Error fetching recipe:", error)
    throw error
  }
}
