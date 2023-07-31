import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import * as dotenv from 'dotenv'

dotenv.config()

const walletConnectProjectId = '00679a69fb87981fa9ad6f87e8378fe3'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [
    infuraProvider({ apiKey: 'e31a7da7487642f1997f48691834aab1'  }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
