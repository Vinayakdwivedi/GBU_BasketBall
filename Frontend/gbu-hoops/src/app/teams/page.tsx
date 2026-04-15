import { getTeams } from '@/lib/api'
import { SectionHead } from '@/components/UI'
import Link from 'next/link'
// import Image from 'next/image' // Uncomment if you switch to Next Image later

export const revalidate = 300

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '')

const withApiBase = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  if (!API_BASE) return path
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}

export default async function TeamsPage() {
  let teams
  try {
    teams = await getTeams()
  } catch {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Could not load teams.</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHead label="All" accent="Teams" count={`${teams.length} teams`} />

      {teams.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          No teams registered yet.
        </div>
      )}

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}>
        {teams.map(team => (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              // We removed the JS event handlers and moved the hover logic into Tailwind classes here!
              // hover:-translate-y-[2px] lifts it up, hover:border-[var(--orange)] changes the border
              className="rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-[2px] hover:border-[var(--orange)]"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Top */}
              <div className="flex items-center gap-4 p-5" style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
                {team.logo ? (
                  <img src={withApiBase(team.logo)} alt={team.name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--orange-glow)', border: '2px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 900, color: 'var(--orange)', flexShrink: 0 }}>
                    {team.name[0]}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 900, lineHeight: 1.1, color: 'var(--white)' }}>
                    {team.name}
                  </div>
                  {team.group && (
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 2 }}>
                      Group {team.group}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 900, color: 'var(--orange)', lineHeight: 1 }}>
                    {/* Note: Ensure team.players exists in your DRF Serializer, otherwise this might be undefined */}
                    {team.players ? team.players.length : 0} 
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    Players
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  View Roster →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}









