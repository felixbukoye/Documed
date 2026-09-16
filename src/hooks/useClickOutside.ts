import { useEffect, type RefObject } from 'react'

/** Calls `handler` when a pointer event lands outside the referenced element. */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return
    function onDown(e: MouseEvent | TouchEvent) {
      const el = ref.current
      if (!el || el.contains(e.target as Node)) return
      handler()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handler()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, handler, active])
}
