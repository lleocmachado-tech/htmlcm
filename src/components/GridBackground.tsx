interface GridBackgroundProps {
  offsetX: number
  offsetY: number
}

function GridBackground({ offsetX, offsetY }: GridBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-10"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width={48} height={48} patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth={0.6} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  )
}

export default GridBackground
