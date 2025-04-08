import Logo from "./logo"
import SearchBar from "./search-bar"

interface HeaderProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function Header({ onSearch, isLoading }: HeaderProps) {
  return (
    <header className="flex flex-col items-center justify-between w-full gap-4 p-4 md:flex-row">
      <Logo />
      <SearchBar onSearch={onSearch} isLoading={isLoading} />
    </header>
  )
}
