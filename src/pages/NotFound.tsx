import { Link } from 'react-router-dom'
import { Compass, HeartPulse } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="grid h-16 w-16 place-items-center rounded-3xl bg-primary-100 text-primary-600">
        <Compass size={30} />
      </span>
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-900">404</h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        This record doesn't exist or you may not have permission to view it.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
      >
        <HeartPulse size={16} /> Back to Dashboard
      </Link>
    </div>
  )
}
