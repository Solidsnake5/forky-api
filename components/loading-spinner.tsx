export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-4 border-amber-300 rounded-full border-t-amber-500 animate-spin"></div>
    </div>
  )
}
