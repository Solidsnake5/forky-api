"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search over 1,000,000 recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 pl-4 pr-24 text-gray-700 bg-white rounded-full focus:outline-none border-2 border-amber-200 focus:border-amber-400 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-0 flex items-center justify-center h-full px-6 font-medium text-white transition-colors rounded-full bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 disabled:opacity-70"
          disabled={isLoading || !query.trim()}
        >
          <Search className="w-5 h-5 mr-2" />
          SEARCH
        </button>
      </div>
    </form>
  )
}
