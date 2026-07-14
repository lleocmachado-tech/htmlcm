import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import MobileMenu from './MobileMenu'
import GridBackground from './GridBackground'
import SpotlightReveal from './SpotlightReveal'
import { BG_IMAGE_1, OVERLAY_IMAGE } from '../constants'

const PARALLAX_STRENGTH = 16
const PARALLAX_EASE = 0.06

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 })

  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      target.current = {
        x: ((e.clientX - centerX) / rect.width) * PARALLAX_STRENGTH,
        y: ((e.clientY - centerY) / rect.height) * PARALLAX_STRENGTH,
      }
    }
    window.addEventListener('pointermove', handlePointerMove)

    const animate = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * PARALLAX_EASE
      smooth.current.y += (target.current.y - smooth.current.y) * PARALLAX_EASE
      setGridOffset({ x: smooth.current.x, y: smooth.current.y })
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="font-helvetica-neue relative h-[100vh] w-full overflow-hidden bg-black">
      <Nav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section ref={sectionRef} className="relative h-full w-full overflow-hidden">
        <GridBackground offsetX={gridOffset.x} offsetY={gridOffset.y} />

        <div
          className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        <h1
          className="absolute inset-x-0 top-20 z-20 select-none text-center text-[4.5rem] font-normal uppercase leading-[0.9] text-white xs:text-[5.5rem] sm:top-28 sm:text-[10rem] md:top-32 md:text-[13rem] lg:text-[16rem]"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Measured
        </h1>

        <img
          src={OVERLAY_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] h-full w-full object-cover"
        />

        <SpotlightReveal sectionRef={sectionRef} />
      </section>
    </div>
  )
}

export default Hero
