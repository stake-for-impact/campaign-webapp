import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
import type { Metadata } from 'next'
import React from 'react'
import './global.css'
import '../input.css'

export const metadata: Metadata = {
  title: 'wagmi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
