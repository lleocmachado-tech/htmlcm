import { useEffect, useRef, type RefObject } from 'react'
import { FRONT_VIDEO } from '../constants'

const RADIUS = 260
const LERP_FACTOR = 0.1

interface SpotlightRevealProps {
  sectionRef: RefObject<HTMLDivElement>
}

function SpotlightReveal({ sectionRef }: SpotlightRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const maskTargetRef = useRef<HTMLDivElement>(null)

  const targetPos = useRef({ x: -9999, y: -9999 })
  const smoothPos = useRef({ x: -9999, y: -9999 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handlePointerLeave = () => {
      targetPos.current = { x: -9999, y: -9999 }
    }

    section.addEventListener('pointermove', handlePointerMove)
    section.addEventListener('pointerleave', handlePointerLeave)

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * LERP_FACTOR
      smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * LERP_FACTOR

      const canvas = canvasRef.current
      const maskTarget = maskTargetRef.current
      if (canvas && maskTarget) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const { x, y } = smoothPos.current
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, RADIUS)
          gradient.addColorStop(0, 'rgba(255,255,255,1)')
          gradient.addColorStop(0.4, 'rgba(255,255,255,1)')
          gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)')
          gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)')
          gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)')
          gradient.addColorStop(1, 'rgba(255,255,255,0)')

          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          const dataUrl = canvas.toDataURL()
          maskTarget.style.webkitMaskImage = `url(${dataUrl})`
          maskTarget.style.maskImage = `url(${dataUrl})`
        }
      }

      rafId.current = requestAnimationFrame(draw)
    }
    rafId.current = requestAnimationFrame(draw)

    return () => {
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', resizeCanvas)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [sectionRef])

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      <div
        ref={maskTargetRef}
        className="absolute inset-0"
        style={{
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <video
          src={FRONT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: 'inset(40% 0 0 0)' }}
        />
      </div>
    </div>
  )
}

export default SpotlightReveal
