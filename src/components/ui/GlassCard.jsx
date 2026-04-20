export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-purple-deep/30 backdrop-blur-md ${className}`}
      style={{ background: 'var(--bg-glass)' }}
    >
      {children}
    </div>
  )
}
