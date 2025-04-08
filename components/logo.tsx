import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-600"
        >
          <path d="M8 3v7c0 0.5-0.5 1-1 1H5c-0.5 0-1-0.5-1-1V3h4Z" />
          <path d="M12 3v18" />
          <path d="M16 3v7c0 0.5 0.5 1 1 1h2c0.5 0 1-0.5 1-1V3h-4Z" />
        </svg>
      </div>
      <span className="text-2xl font-semibold text-gray-800">fork-it!</span>
    </Link>
  )
}
