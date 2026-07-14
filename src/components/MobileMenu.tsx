import { NAV_ITEMS } from '../constants'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className="fixed inset-0 z-[55] flex flex-col bg-[#0a0a0a] transition-opacity duration-300"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
      }}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="liquid-glass absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full sm:right-8 sm:top-6"
        style={{
          transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)',
          opacity: open ? 1 : 0,
          transition: 'transform 450ms cubic-bezier(0.77, 0, 0.18, 1), opacity 450ms cubic-bezier(0.77, 0, 0.18, 1)',
        }}
      >
        <span className="absolute h-[1.5px] w-5 rotate-45 bg-white" />
        <span className="absolute h-[1.5px] w-5 -rotate-45 bg-white" />
      </button>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            type="button"
            onClick={onClose}
            className="text-3xl font-medium text-white/90 sm:text-4xl"
            style={{
              transform: open ? 'translateY(0)' : 'translateY(24px)',
              opacity: open ? 1 : 0,
              transition: `transform 500ms cubic-bezier(0.77, 0, 0.18, 1) ${
                open ? 100 + i * 60 : 0
              }ms, opacity 500ms cubic-bezier(0.77, 0, 0.18, 1) ${open ? 100 + i * 60 : 0}ms`,
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex justify-center pb-12">
        <button
          type="button"
          onClick={onClose}
          className="liquid-glass flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(24px)',
            opacity: open ? 1 : 0,
            transition: `transform 500ms cubic-bezier(0.77, 0, 0.18, 1) ${
              open ? 100 + NAV_ITEMS.length * 60 : 0
            }ms, opacity 500ms cubic-bezier(0.77, 0, 0.18, 1) ${
              open ? 100 + NAV_ITEMS.length * 60 : 0
            }ms`,
          }}
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Reserve Yours
        </button>
      </div>
    </div>
  )
}

export default MobileMenu
