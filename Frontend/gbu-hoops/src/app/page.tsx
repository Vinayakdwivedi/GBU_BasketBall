import { getHomeData, getNotifications } from '@/lib/api'
import LandingClient from '@/components/landing/LandingClient'

export const revalidate = 2

export default async function HomePage() {
  const [homeResult, notifResult] = await Promise.allSettled([
    getHomeData(),
    getNotifications(),
  ])

  if (homeResult.status === 'rejected') {
    return (
      <div
        className="max-w-6xl mx-auto px-6 py-20 text-center"
        style={{
          color: 'var(--muted)',
          fontFamily: 'var(--font-head)',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        Could not reach the API. Make sure Django is running on port 8000.
      </div>
    )
  }

  const data = homeResult.value
  const notifications = notifResult.status === 'fulfilled' ? notifResult.value : []

  return (
    <LandingClient
      tournament={data.tournament}
      notifications={notifications}
      liveMatch={data.live_match}
      nextMatch={data.next_match}
      recentResults={data.recent_results}
      stats={data.stats}
    />
  )
}