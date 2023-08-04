import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
import type { Metadata } from 'next'
import React from 'react'
import './global.css'
import '../input.css'
import { Analytics } from '@vercel/analytics/react'

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
        <Analytics />
      </body>
    </html>
  )
}
