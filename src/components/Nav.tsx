import Logo from './Logo'
import { NAV_ITEMS } from '../constants'

interface NavProps {
  menuOpen: boolean
  onToggleMenu: () => void
}

function Nav({ menuOpen, onToggleMenu }: NavProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="liquid-glass pointer-events-auto absolute left-1/2 top-6 hidden -translate-x-1/2 items-center gap-1 rounded-full px-2 py-2 md:flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="liquid-glass hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white md:flex"
      >
        <span className="h-2 w-2 rounded-full bg-green-400" />
        Reserve Yours
      </button>

      <button
        type="button"
        aria-label="Open menu"
        onClick={onToggleMenu}
        className="liquid-glass flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
      >
        <span
          className={`h-[1.5px] w-5 bg-white transition-transform duration-300 ${
            menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
          }`}
        />
        <span
          className={`h-[1.5px] w-3.5 bg-white transition-all duration-300 ${
            menuOpen ? 'w-5 -translate-y-[1.5px] -rotate-45' : ''
          }`}
        />
      </button>
    </nav>
  )
}

export default Nav
