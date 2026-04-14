'use client'

import Link from 'next/link'
import { Badge } from '@/components/UI'
import NotificationBell from '@/components/Notificationbell'

export default function HeroSection({ tournament, notifications }: { tournament: any, notifications: any[] }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '60%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Notification Bell */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          zIndex: 50,
        }}
      >
        <NotificationBell notifications={notifications} />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm text-orange-600 font-bold uppercase tracking-widest">
          <span>🏀</span> Season {tournament?.year ?? new Date().getFullYear()}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(64px, 11vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: -2,
            marginBottom: 20,
            maxWidth: '65%', // Room for 3D ball
          }}
        >
          GBU
          <br />
          <span style={{ color: 'var(--orange)', WebkitTextStroke: '1px rgba(249,115,22,0.3)' }}>
            Basket
          </span>
          <br />
          ball
        </h1>

        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 400, lineHeight: 1.6, marginBottom: 28 }}>
          Live scores, fixtures, results and everything you need to follow the upcoming tournament.
        </p>

        {tournament && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 36 }}>
            <span className="text-sm font-semibold text-slate-500">
              📍 <strong className="text-slate-800">{tournament.venue}</strong>
            </span>
            <span className="text-sm font-semibold text-slate-500">
              🏆 <strong className="text-slate-800">{tournament.name}</strong>
            </span>
            {tournament.status === 'ongoing' && <Badge variant="live">In Progress</Badge>}
            {tournament.status === 'upcoming' && <Badge variant="scheduled">Coming Soon</Badge>}
            {tournament.status === 'completed' && <Badge variant="done">Concluded</Badge>}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
          <Link
            href="/fixtures"
            className="liquid-glass text-orange-600 font-bold uppercase tracking-wide px-8 py-3 rounded-lg hover:scale-105 transition-transform"
          >
            View Fixtures →
          </Link>
          <Link
            href="/teams"
            className="liquid-glass text-slate-700 font-bold uppercase tracking-wide px-8 py-3 rounded-lg hover:scale-105 transition-transform"
          >
            Teams
          </Link>
        </div>
      </div>
    </div>
  )
}
