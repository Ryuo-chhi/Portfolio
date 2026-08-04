/**
 * The brass pushpin, used to mark the active section pill and active notebook tab.
 * Draws a halo keyline beneath the fills to ensure contrast on all backgrounds.
 * 
 * @param {object} props
 * @param {string} [props.className]
 */
export default function Pin({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[21px] h-[25px] overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* Halo for dark/green backgrounds */}
      <path
        d="M12 11V21"
        stroke="var(--color-pin-halo)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="6.8" fill="var(--color-pin-halo)" />

      {/* The Pin itself */}
      <path
        d="M12 11V21"
        stroke="var(--color-pin-edge)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="7"
        r="5"
        fill="var(--color-pin-head)"
        stroke="var(--color-pin-edge)"
        strokeWidth="2"
      />
      
      {/* Highlight/shine */}
      <path
        d="M10 5.5A2.5 2.5 0 0113.5 4"
        stroke="#ffd9a6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
