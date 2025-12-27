import { UniversalConnector } from '@reown/appkit-universal-connector'

interface ActionButtonListProps {
  universalConnector: UniversalConnector | undefined
  session: any
  setSession: (session: any) => void
}

export const ActionButtonList = ({
  universalConnector,
  session,
  setSession
}: ActionButtonListProps) => {
//   // Sign Stacks message
//   const handleSignStacksMsg = async () => {
//     if (!universalConnector) return

//     const message = 'Hello Reown AppKit!'
//     try {
//       const account =
//         session?.namespaces?.stacks?.accounts?.[0]?.split(':')[2]

//       if (!account) {
//         throw new Error('No Stacks account found')
//       }

//       const result = await universalConnector.request(
//         {
//           method: 'stx_signMessage',
//           params: {
//             message,
//             address: account
//           }
//         },
//         'stacks:1'
//       )

//       console.log('>> Stacks Sign Message result', result)
//     } catch (error) {
//       console.error('>> Stacks Sign Message error', error)
//     }
//   }

  const handleDisconnect = async () => {
    if (!universalConnector) return
    await universalConnector.disconnect()
    setSession(null)
  }

  const handleConnect = async () => {
    if (!universalConnector) return
    const { session: providerSession } =
      await universalConnector.connect()
    setSession(providerSession)
  }

  return (
    <div>
      <p className="small" style={{ marginBottom: 16 }}>
        Connect via QR code for mobile wallets. Sign a test message to verify connection.
      </p>
      {session ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <div className="status-badge status-connected" style={{ display: 'inline-block' }}>
              Connected
            </div>
            <div className="small" style={{ marginTop: 8 }}>
              Account: {session.namespaces?.stacks?.accounts?.[0]}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn ghost" onClick={handleDisconnect} style={{ flex: 1 }}>
              Disconnect
            </button>
          </div>
        </>
      ) : (
        <button className="btn primary" onClick={handleConnect} style={{ width: '100%' }}>
          Connect Mobile Wallet
        </button>
      )}
    </div>
  )
}
