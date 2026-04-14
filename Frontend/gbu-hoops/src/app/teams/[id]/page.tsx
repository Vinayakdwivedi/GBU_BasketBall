// src/app/teams/[id]/page.tsx

import { getTeam } from '../../../lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 300

//  params is now a Promise in Next.js 15
type Props = {
  params: Promise<{ id: string }>
}

export default async function TeamDetailPage({ params }: Props) {
  // ✅ await before accessing .id
  const { id } = await params

  const teamId = Number(id)
  if (isNaN(teamId)) notFound()   // guard against /teams/abc

  let data
  try {
    data = await getTeam(teamId)
  } catch (err) {
    console.error('Error fetching team:', err)
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center"
        style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>
        Team not found.
      </div>
    )
  }

  const { team, matches } = data
  // ... rest of your JSX stays exactly the same

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/teams" style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
        ← All Teams
      </Link>

      {/* Header */}
      <div className="rounded-xl p-8 flex items-center gap-7 mb-9" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
        {team.logo ? (
          <img src={`http://127.0.0.1:8000${team.logo}`} alt={team.name} style={{ width: 86, height: 86, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--orange)', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 86, height: 86, borderRadius: '50%', background: 'var(--orange-glow)', border: '3px solid rgba(249,115,22,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 900, color: 'var(--orange)', flexShrink: 0 }}>
            {team.name[0]}
          </div>
        )}
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 46, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase' }}>
            {team.name}
          </div>
          <div className="flex gap-4 mt-2 flex-wrap">
            {team.group && <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>Group <strong style={{ color: 'var(--white)' }}>{team.group}</strong></span>}
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}><strong style={{ color: 'var(--white)' }}>{team.players.length}</strong> Players</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Roster */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 mb-7">
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>
              Team <span style={{ color: 'var(--orange)' }}>Roster</span>
            </h2>
          </div>
          <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid var(--border)' }}>
            {team.players.length === 0 ? (
              <div className="p-8 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>No players listed.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 320 }}>
                <thead>
                  <tr style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
                    {['#', 'Name', 'Position'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', padding: '10px 18px', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {team.players.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: i < team.players.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--bg2)' }}>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 900, color: 'var(--orange)' }}>{p.jersey_number}</span>
                      </td>
                      <td style={{ padding: '12px 18px', fontFamily: 'var(--font-body)', fontSize: 15 }}>{p.name}</td>
                      <td style={{ padding: '12px 18px' }}>
                        {p.position ? (
                          <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 99 }}>
                            {p.position}
                          </span>
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Match History */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 mb-7">
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>
              Match <span style={{ color: 'var(--orange)' }}>History</span>
            </h2>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {matches.length === 0 ? (
              <div className="p-8 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>No matches played yet.</div>
            ) : (
              matches.map((m, i) => {
                const winA = m.winner_id === m.team_a.id
                const winB = m.winner_id === m.team_b.id
                return (
                  <div key={m.id} className="grid items-center gap-2 md:gap-3 px-4 py-4"
                    style={{ gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', borderBottom: i < matches.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--bg2)' }}>
                    {/* Team A */}
                    <div className="min-w-0">
                      <div className="truncate" style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(14px, 4vw, 15px)', fontWeight: 700, color: winA ? 'var(--orange)' : 'var(--white)' }}>
                        {m.team_a.name}
                      </div>
                    </div>
                    {/* Score */}
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(15px, 4vw, 18px)', fontWeight: 900, textAlign: 'center', padding: '0 4px' }}>
                      {m.status === 'scheduled' ? <span style={{ color: 'var(--muted)', fontSize: 13 }}>vs</span> : `${m.score_a} — ${m.score_b}`}
                    </div>
                    {/* Team B */}
                    <div className="min-w-0 text-right">
                      <div className="truncate" style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(14px, 4vw, 15px)', fontWeight: 700, color: winB ? 'var(--orange)' : 'var(--white)' }}>
                        {m.team_b.name}
                      </div>
                    </div>
                    {/* Metadata line (spans all 3 cols on mobile if placed here, or we do a flex column wrap) */}
                    <div className="col-span-3 text-center mt-2 border-t border-[rgba(255,255,255,0.05)] pt-2" style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {m.round_display} <span style={{ margin: '0 6px' }}>·</span> <span style={{ color: 'var(--muted2)' }}>{new Date(m.scheduled_datetime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

      </div>
    </div>
  )
}