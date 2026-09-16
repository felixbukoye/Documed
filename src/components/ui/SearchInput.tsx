import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string
}

/** Pill/rounded search input with a leading magnifier icon (PRD §4.3). */
export default function SearchInput({
  containerClassName = '',
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <div className={`relative ${containerClassName}`}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <input
        type="search"
        className={`w-full rounded-xl border border-neutral-200 bg-surface-app/60 py-2 pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 transition focus:border-primary-400 focus:bg-white focus:shadow-ring ${className}`}
        {...props}
      />
    </div>
  )
}
