"use client"

export const AnimatedBackground = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1
          const opacity = Math.random() * 0.5 + 0.1
          const animationDuration = Math.random() * 100 + 50
          const top = Math.random() * 100
          const left = Math.random() * 100
          const color =
            i % 5 === 0
              ? "#8b5cf6"
              : i % 4 === 0
                ? "#3b82f6"
                : i % 3 === 0
                  ? "#10b981"
                  : i % 2 === 0
                    ? "#f59e0b"
                    : "#f43f5e"

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: opacity,
                backgroundColor: color,
                animation: `float ${animationDuration}s ease-in-out infinite`,
              }}
            />
          )
        })}
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.3; }
          50% { transform: translateY(0) translateX(10px); opacity: 0.2; }
          75% { transform: translateY(10px) translateX(5px); opacity: 0.3; }
        }
      `}</style>
    </>
  )
}
