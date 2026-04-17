'use client'

import { Match } from '@/types'

/* ── BADGE ── */
type BadgeVariant = 'live' | 'scheduled' | 'done' | 'pinned'

export function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  const styles: Record<BadgeVariant, React.CSSProperties> = {
    live: {
      color: 'var(--live)',
      background: 'var(--live-glow)',
      border: '1px solid rgba(34,197,94,0.3)',
    },
    scheduled: {
      color: '#60a5fa',
      background: 'rgba(96,165,250,0.1)',
      border: '1px solid rgba(96,165,250,0.25)',
    },
    done: {
      color: 'var(--muted)',
      background: 'var(--bg3)',
      border: '1px solid var(--border)',
    },
    pinned: {
      color: 'var(--orange)',
      background: 'var(--orange-glow)',
      border: '1px solid rgba(249,115,22,0.3)',
    },
  }

  return (
    <span
      className="inline-flex items-center gap-1"
      style={{
        fontFamily: 'var(--font-head)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        padding: '3px 10px',
        borderRadius: 99,
        ...styles[variant],
      }}
    >
      {variant === 'live' && (
        <span
          className="pulse-dot rounded-full"
          style={{ width: 6, height: 6, background: 'var(--live)', display: 'inline-block' }}
        />
      )}
      {children}
    </span>
  )
}

/* ── SECTION HEADING ── */
export function SectionHead({ label, accent, count }: { label: string; accent: string; count?: string | number }) {
  return (
    <div className="flex items-baseline gap-3 mb-7">
      <h2
        style={{
          fontFamily: 'var(--font-head)',
          fontSize: 30,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          lineHeight: 1,
        }}
      >
        {label} <span style={{ color: 'var(--orange)' }}>{accent}</span>
      </h2>
      {count !== undefined && (
        <span
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {count}
        </span>
      )}
    </div>
  )
}

/* ── STAT BOX ── */
export function StatBox({ number, label }: { number: number; label: string }) {
  return (
    <div
      className="p-5 rounded-xl"
      style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
    >
      <div
        style={{
          fontFamily: 'var(--font-head)',
          fontSize: 46,
          fontWeight: 900,
          color: 'var(--orange)',
          lineHeight: 1,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-head)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  )
}

/* ── MATCH ROW (used in fixtures + results) ── */
export function MatchRow({ match }: { match: Match }) {
  const isLive = match.status === 'live'
  const isDone = match.status === 'completed'
  const dt     = new Date(match.scheduled_datetime)

  return (
    <div
      className="rounded-lg px-4 md:px-5 py-4 flex flex-col md:grid md:grid-cols-[1fr_130px_1fr_90px_80px] md:items-center gap-4 md:gap-3 transition-all"
      style={{
        background: 'var(--bg2)',
        border: `1px solid ${isLive ? 'rgba(34,197,94,0.35)' : 'var(--border)'}`,
        transition: 'border-color 0.15s',
      }}
    >
      {/* Top half for Mobile (Teams & Score), unwrapped on Desktop */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:contents">
        {/* Team A */}
        <div className="min-w-0">
          <div className="truncate" title={match.team_a.name} style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(14px, 4.5vw, 17px)', fontWeight: 800 }}>
            {match.team_a.name}
          </div>
          {match.team_a.group && (
            <div className="truncate" style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Group {match.team_a.group}
            </div>
          )}
        </div>

        {/* Score / Time */}
        <div className="text-center px-2 md:px-0">
          {match.status === 'scheduled' ? (
            <div style={{ fontFamily: 'var(--font-head)', color: 'var(--muted)', fontSize: 13, fontWeight: 700, lineHeight: 1.4, textTransform: 'uppercase' }}>
              <div style={{ color: 'var(--white)', fontSize: 14 }}>{dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' })}</div>
              <div>{dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}</div>
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 900, color: isLive ? 'var(--live)' : 'var(--white)', letterSpacing: -0.5 }}>
              {match.score_a} <span style={{color: 'var(--muted)', margin: '0 2px'}}>—</span> {match.score_b}
            </div>
          )}
        </div>

        {/* Team B */}
        <div className="min-w-0 text-right">
          <div className="truncate" title={match.team_b.name} style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(14px, 4.5vw, 17px)', fontWeight: 800 }}>
            {match.team_b.name}
          </div>
          {match.team_b.group && (
            <div className="truncate" style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Group {match.team_b.group}
            </div>
          )}
        </div>
      </div>

      {/* Bottom half for Mobile (Venue & Status), unwrapped on Desktop */}
      <div className="flex justify-between items-center pt-3 border-t border-[rgba(255,255,255,0.05)] md:pt-0 md:border-none md:contents">
        {/* Venue */}
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--muted)', textTransform: 'uppercase' }}>
          {match.venue ? `📍 ${match.venue}` : ''}
        </div>

        {/* Status */}
        <div className="md:text-right">
          {isLive && <Badge variant="live">Live</Badge>}
          {match.status === 'scheduled' && <Badge variant="scheduled">Soon</Badge>}
          {isDone && <Badge variant="done">Done</Badge>}
        </div>
      </div>
    </div>
  )
}

/* ── PINNED BANNER ── */
export function PinnedBanner({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, var(--orange-glow), transparent)',
        borderBottom: '1px solid rgba(249,115,22,0.2)',
        padding: '10px 24px',
      }}
    >
      <div
        className="max-w-6xl mx-auto flex items-center gap-3"
        style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600 }}
      >
        <Badge variant="pinned">Notice</Badge>
        <span>📌</span>
        <span>
          <strong>{title}</strong> — {body.slice(0, 120)}{body.length > 120 ? '…' : ''}
        </span>
      </div>
    </div>
  )
}