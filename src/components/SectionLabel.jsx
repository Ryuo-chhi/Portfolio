/**
 * The small mono eyebrow above each heading.
 *
 * @param {object} props
 * @param {string} props.children
 */
export default function SectionLabel({ children }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-bold mb-4">
      {children}
    </div>
  )
}
