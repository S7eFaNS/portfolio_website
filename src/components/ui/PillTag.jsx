export default function PillTag({ label }) {
  return (
    <span
      style={{ padding: '0.2rem 0.5rem' }}
      className="inline-flex items-center justify-center font-mono text-sm text-purple-primary bg-purple-primary/10 border border-purple-primary/20 rounded-full tracking-wide"
    >
      {label}
    </span>
  )
}