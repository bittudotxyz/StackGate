import type { CustomCaipNetwork } from '@reown/appkit-common'
import { UniversalConnector } from '@reown/appkit-universal-connector'

// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

/**
 * Stacks Mainnet
 */
const stacksMainnet: CustomCaipNetwork<'stacks'> = {
  id: 1,
  chainNamespace: 'stacks' as const,
  caipNetworkId: 'stacks:1',
  name: 'Stacks',
  nativeCurrency: {
    name: 'STX',
    symbol: 'STX',
    decimals: 6
  },
  rpcUrls: {
    default: {
      http: ['https://stacks-node-mainnet.stacks.co']
    }
  }
}

export async function getUniversalConnector() {
  const universalConnector = await UniversalConnector.init({
    projectId,
    metadata: {
      name: 'Universal Connector',
      description: 'Universal Connector',
      url: window.location.origin,
      icons: ['https://appkit.reown.com/icon.png']
    },
    networks: [
      {
        methods: ['stx_signMessage'],
        chains: [stacksMainnet as CustomCaipNetwork],
        events: ['stx_chainChanged'],
        namespace: 'stacks'
      }
    ]
  })

  return universalConnector
}
