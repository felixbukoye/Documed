import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

/**
 * Authenticated app shell (PRD §4.4): fixed left sidebar + persistent top bar
 * + fluid main content. Sidebar is persistent on desktop and an off-canvas
 * drawer below the tablet breakpoint.
 */
export default function AppShell() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex h-full min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-neutral-200/70 lg:block">
        <div className="fixed inset-y-0 left-0 w-72">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile off-canvas drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] animate-fade-in"
            onClick={() => setNavOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-dropdown animate-slide-in">
            <Sidebar onNavigate={() => setNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenNav={() => setNavOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
