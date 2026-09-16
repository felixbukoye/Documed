import { useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Simulates fetching a widget's data asynchronously.
 * PRD §6.6 / §7.1: every widget has an independent loading state so a slow
 * chart never blocks the dashboard from becoming interactive.
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = [],
  delay = 650,
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let alive = true
    setState({ data: null, loading: true, error: null })
    const timer = setTimeout(async () => {
      try {
        const data = await fetcher()
        if (alive) setState({ data, loading: false, error: null })
      } catch (err) {
        if (alive)
          setState({ data: null, loading: false, error: err as Error })
      }
    }, delay)
    return () => {
      alive = false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
