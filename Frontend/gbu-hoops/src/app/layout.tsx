import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { getHomeData } from '@/lib/api'

export const metadata: Metadata = {
  title: "Ball O'Roma — GBU Basketball Tournament",
  description: 'Live scores, fixtures, results and gallery for GBU Basketball Tournament',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let hasLive = false
  try {
    const data = await getHomeData()
    hasLive = !!data.live_match
  } catch {}

  return (
    <html lang="en">
      <body>
        <Navbar hasLive={hasLive} />
        <main>{children}</main>
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '28px 24px',
            textAlign: 'center',
            fontFamily: 'var(--font-head)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          Ball O&apos;Roma &nbsp;·&nbsp; Gautam Buddha University &nbsp;·&nbsp; Made with ♥ by Vinayak
        </footer>
      </body>
    </html>
  )
}