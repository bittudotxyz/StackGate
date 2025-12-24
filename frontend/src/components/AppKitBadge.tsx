import { useAppKit } from '@reown/appkit/react'

export default function AppKitBadge() {
  const { open } = useAppKit()

  return (
    <button
      className="btn ghost"
      onClick={() => open()}
      style={{ opacity: 0.6 }}
    >
      AppKit Enabled
    </button>
  )
}
