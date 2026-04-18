import { getResults } from '@/lib/api'
import { SectionHead } from '@/components/UI'

export const revalidate = 60

/* Ensure naive datetimes from Django are treated as IST */
function parseIST(raw: string): Date {
  if (/[Zz]|\+|\u2013/.test(raw.slice(19)) || /[+-]\d{2}:\d{2}$/.test(raw)) {
    return new Date(raw)
  }
  return new Date(raw + '+05:30')
}

export default async function ResultsPage() {
  let results
  try {
    results = await getResults()
  } catch {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Could not load results.</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHead label="Match" accent="Results" count={`${results.length} played`} />

      {results.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          No results yet — matches in progress.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {results.map(match => {
          const winA = match.winner_id === match.team_a.id
          const winB = match.winner_id === match.team_b.id
          const dt = parseIST(match.scheduled_datetime)

          return (
            <div
              key={match.id}
              className="rounded-xl px-6 py-5 grid items-center gap-5"
              style={{
                gridTemplateColumns: '1fr auto 1fr',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Team A */}
              <div className="flex flex-col gap-1">
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, lineHeight: 1.1, color: winA ? 'var(--orange)' : 'var(--white)' }}>
                  {match.team_a.name} {winA ? '🏆' : ''}
                </div>
                {match.team_a.group && (
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    Group {match.team_a.group}
                  </div>
                )}
              </div>

              {/* Center */}
              <div className="text-center flex flex-col items-center gap-2">
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 40, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>
                  {match.score_a} — {match.score_b}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '2px 10px', borderRadius: 99 }}>
                    {match.round_display}
                  </span>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}
                  </span>
                </div>
              </div>

              {/* Team B */}
              <div className="flex flex-col items-end gap-1">
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, lineHeight: 1.1, textAlign: 'right', color: winB ? 'var(--orange)' : 'var(--white)' }}>
                  {winB ? '🏆 ' : ''}{match.team_b.name}
                </div>
                {match.team_b.group && (
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    Group {match.team_b.group}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}