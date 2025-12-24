import { AppKitProvider } from '@reown/appkit/react'
import App from './App'

export default function Root() {
  return (
    <AppKitProvider
      projectId="0976f69cd950c0ba6547b5b0b07cfec7"
      networks={[
        {
          id: 1,
          name: 'Ethereum',
          chainNamespace: 'eip155',
          caipNetworkId: 'eip155:1',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: {
            default: {
              http: ['https://cloudflare-eth.com'],
            },
          },
        },
      ]}
    >
      <App />
    </AppKitProvider>
  )
}
