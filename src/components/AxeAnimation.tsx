import { useEffect, useRef } from 'react'

const SWING_AMPLITUDE = 14 // graus máximos de balanço
const SWING_SPEED = 0.0016 // velocidade do ciclo
const LERP_FACTOR = 0.08

function AxeAnimation() {
  const groupRef = useRef<SVGGElement>(null)
  const rafId = useRef<number | null>(null)
  const currentAngle = useRef(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    const animate = (time: number) => {
      if (startTime.current === null) startTime.current = time
      const elapsed = time - startTime.current

      // balanço pendular suave via seno
      const targetAngle = Math.sin(elapsed * SWING_SPEED) * SWING_AMPLITUDE
      currentAngle.current += (targetAngle - currentAngle.current) * LERP_FACTOR

      const group = groupRef.current
      if (group) {
        group.setAttribute('transform', `rotate(${currentAngle.current} 128 40)`)
      }

      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-[12vh]">
      <svg
        width="180"
        height="320"
        viewBox="0 0 256 460"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90 mix-blend-luminosity drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="axe-handle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c5a3a" />
            <stop offset="50%" stopColor="#8f6b45" />
            <stop offset="100%" stopColor="#5e4229" />
          </linearGradient>
          <linearGradient id="axe-blade" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#e8ecf0" />
            <stop offset="45%" stopColor="#b9c2cc" />
            <stop offset="100%" stopColor="#7d8894" />
          </linearGradient>
          <linearGradient id="axe-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c7d0d8" />
          </linearGradient>
        </defs>

        {/* grupo animado — pivô no topo (128 40), o machado balança pendendo da lâmina */}
        <g ref={groupRef} style={{ transformBox: 'view-box' }}>
          {/* cabo de madeira */}
          <rect
            x="118"
            y="60"
            width="20"
            height="360"
            rx="9"
            fill="url(#axe-handle)"
            stroke="#3d2c1a"
            strokeWidth="1.5"
          />
          {/* punho na base */}
          <rect x="114" y="405" width="28" height="18" rx="8" fill="#4a3320" />

          {/* cabeça do machado */}
          <g>
            {/* corpo da lâmina */}
            <path
              d="M128 30
                 C 90 30, 58 44, 40 78
                 C 30 96, 30 120, 44 132
                 C 70 120, 100 116, 128 116
                 Z"
              fill="url(#axe-blade)"
              stroke="#5a636d"
              strokeWidth="1.5"
            />
            {/* gume afiado */}
            <path
              d="M40 78
                 C 30 96, 30 120, 44 132
                 C 34 118, 34 96, 44 82
                 Z"
              fill="url(#axe-edge)"
            />
            {/* olho do machado (encaixe do cabo) */}
            <rect x="120" y="46" width="16" height="60" rx="6" fill="#6b7480" opacity="0.9" />
            {/* reflexo metálico */}
            <path
              d="M70 52 C 56 60, 48 74, 46 90"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default AxeAnimation
