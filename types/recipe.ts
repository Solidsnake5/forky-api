export interface Recipe {
  id: string
  title: string
  publisher: string
  image_url: string
  source_url: string
  cooking_time: number
  servings: number
  ingredients: {
    quantity: number | null
    unit: string
    description: string
  }[]
}

export interface SearchResult {
  id: string
  title: string
  publisher: string
  image_url: string
}

export interface SearchResponse {
  status: string
  results: number
  data: {
    recipes: SearchResult[]
  }
}

export interface RecipeResponse {
  status: string
  data: {
    recipe: Recipe
  }
}
