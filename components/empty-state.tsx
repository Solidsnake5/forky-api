import { SmileIcon } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-100">
        <SmileIcon className="w-6 h-6 text-amber-500" />
      </div>
      <h2 className="text-xl font-medium text-gray-700">Start by searching for a recipe or an ingredient. Have fun!</h2>
    </div>
  )
}
