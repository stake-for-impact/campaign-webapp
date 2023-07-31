'use client'

import { useAccount } from 'wagmi'

export function Connected({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()

  if (!isConnected || !address) return null
  return <>{children}</>
}
