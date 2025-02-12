export const AudioWave = () => (
  <svg className="audio-wave" viewBox="0 0 200 100">
    <g className="wave-bars">
      {[...Array(20)].map((_, i) => (
        <g key={i}>
          {/* Barre supérieure */}
          <rect
            x={i * 8 + 5}
            y="50"
            width="3"
            height="0"
            fill="#ffffff"
            className="bar upper"
            style={{
              animationDelay: `${i * 0.1}s`,
              opacity: 1,
              transformOrigin: "center",
            }}
          />
          {/* Barre inférieure */}
          <rect
            x={i * 8 + 5}
            y="50"
            width="3"
            height="0"
            fill="#ffffff"
            className="bar lower"
            style={{
              animationDelay: `${i * 0.1}s`,
              opacity: 1,
              transformOrigin: "center",
            }}
          />
        </g>
      ))}
    </g>
  </svg>
);
