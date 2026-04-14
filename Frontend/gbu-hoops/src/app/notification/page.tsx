import { getNotifications } from '@/lib/api'
import { SectionHead, Badge } from '@/components/UI'
import type { Notification } from '@/types'

export const revalidate = 30

export default async function NotificationsPage() {
  let notifications: Notification[] = []
  try {
    notifications = await getNotifications()
  } catch {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Could not load notices.</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHead label="Notice" accent="Board" count={`${notifications.length} announcements`} />

      {notifications.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          No announcements yet.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className="rounded-xl px-6 py-5 relative"
            style={{
              background: notif.is_pinned ? 'linear-gradient(135deg, var(--bg2), rgba(249,115,22,0.04))' : 'var(--bg2)',
              border: `1px solid ${notif.is_pinned ? 'rgba(249,115,22,0.35)' : 'var(--border)'}`,
            }}
          >
            {/* Orange left bar for pinned */}
            {notif.is_pinned && (
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--orange)', borderRadius: '12px 0 0 12px' }} />
            )}

            {/* Title row */}
            <div className="flex items-center gap-3 mb-3">
              {notif.is_pinned && <span style={{ fontSize: 16 }}>📌</span>}
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, lineHeight: 1.2, flex: 1 }}>
                {notif.title}
              </div>
              {notif.is_pinned && <Badge variant="pinned">Pinned</Badge>}
            </div>

            {/* Body */}
            <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65 }}>
              {notif.body}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 mt-4">
              <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--muted2)' }}>
                {new Date(notif.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                {' · '}
                {new Date(notif.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#60a5fa', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', padding: '2px 8px', borderRadius: 99 }}>
                {notif.target_display}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}