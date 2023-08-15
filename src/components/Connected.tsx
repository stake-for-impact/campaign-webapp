'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '../components/ConnectButton'


export function Connected({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()

  if (!isConnected || !address) return (
    <div className='flex flex-col items-center'>
      Connect wallet to stake your ETH for this campaign or manage existing stake
      <ConnectButton />
    </div>
  )
  return <>{children}</>
}
