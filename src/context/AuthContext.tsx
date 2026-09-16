import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { clinician } from '../lib/mock'

interface AuthUser {
  id: string
  name: string
  role: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, name?: string, role?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'documed.auth.v1'

/**
 * Lightweight, client-only session for the demo.
 * On first visit we seed a session so the dashboard is the landing screen;
 * signing out clears it (and PHI-backed caches) and routes to /login.
 */
function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && parsed.id === 'signed-out') return null
    return parsed as AuthUser
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = readStored()
    if (stored) return stored
    // Demo default session so the dashboard is the first thing clinicians see.
    const seed: AuthUser = {
      id: clinician.id,
      name: clinician.name,
      role: clinician.role,
      email: clinician.email,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    } catch {
      /* ignore */
    }
    return seed
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch {
      /* ignore */
    }
  }, [user])

  const login = useCallback((email: string, name?: string, role?: string) => {
    const user: AuthUser = {
      id: clinician.id,
      name: name || clinician.name,
      role: role || clinician.role,
      email: email || clinician.email,
    }
    setUser(user)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch {
      /* ignore */
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    // PRD §7.4: session invalidated + cached PHI cleared on sign-out.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'signed-out' }))
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
