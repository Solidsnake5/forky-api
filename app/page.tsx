"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import EmptyState from "@/components/empty-state"
import Footer from "@/components/footer"
import RecipeList from "@/components/recipe-list"
import RecipeDetail from "@/components/recipe-detail"
import LoadingSpinner from "@/components/loading-spinner"
import { searchRecipes, getRecipe } from "@/services/recipe-service"
import type { Recipe, SearchResult } from "@/types/recipe"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pagination state - set to display 10 recipes per page
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    setError(null)
    setCurrentPage(1) // Reset to first page on new search

    try {
      const result = await searchRecipes(query)
      setSearchResults(result.data.recipes)

      // Select the first recipe by default if available
      if (result.data.recipes.length > 0) {
        setSelectedRecipeId(result.data.recipes[0].id)
      } else {
        setSelectedRecipeId(null)
        setSelectedRecipe(null)
      }
    } catch (error) {
      setError("Failed to search recipes. Please try again.")
      setSearchResults([])
      setSelectedRecipeId(null)
      setSelectedRecipe(null)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id)
  }

  // Pagination handlers
  const totalPages = Math.ceil(searchResults.length / itemsPerPage)
  const paginatedResults = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Fetch selected recipe details when selectedRecipeId changes
  useEffect(() => {
    if (!selectedRecipeId) return

    const fetchRecipeDetails = async () => {
      setIsLoadingRecipe(true)

      try {
        const recipe = await getRecipe(selectedRecipeId)
        setSelectedRecipe(recipe)
      } catch (error) {
        setError("Failed to load recipe details. Please try again.")
        setSelectedRecipe(null)
      } finally {
        setIsLoadingRecipe(false)
      }
    }

    fetchRecipeDetails()
  }, [selectedRecipeId])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container flex flex-col mx-auto my-4 overflow-hidden bg-white rounded-lg shadow-lg">
        <Header onSearch={handleSearch} isLoading={isSearching} />

        <main className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "150vh" }}>
          <div className={`${searchResults.length > 0 ? "block" : "hidden md:block"} bg-gray-50 flex flex-col h-full`}>
            {isSearching ? (
              <LoadingSpinner />
            ) : searchResults.length > 0 ? (
              <>
                <div className="flex-1 overflow-hidden">
                  <RecipeList
                    recipes={paginatedResults}
                    selectedRecipeId={selectedRecipeId}
                    onSelectRecipe={handleSelectRecipe}
                  />
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="flex items-center px-3 py-1 text-sm font-medium text-amber-600 transition-colors bg-white rounded-md hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Prev
                    </button>
                    <span className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center px-3 py-1 text-sm font-medium text-amber-600 transition-colors bg-white rounded-md hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </>
            ) : searchQuery ? (
              <div className="flex items-center justify-center h-full p-4 text-gray-500">
                No recipes found for &quot;{searchQuery}&quot;. Try another search.
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-center">
            {selectedRecipeId ? (
              isLoadingRecipe ? (
                <LoadingSpinner />
              ) : selectedRecipe ? (
                <RecipeDetail recipe={selectedRecipe} />
              ) : (
                <div className="p-4 text-red-500">{error || "Failed to load recipe details."}</div>
              )
            ) : (
              <EmptyState />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
