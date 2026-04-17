import { getFixtures } from '@/lib/api'
import { SectionHead, MatchRow } from '@/components/UI'
import { Match } from '@/types'
import Link from 'next/link'

export const revalidate = 5

const ROUND_LABELS: Record<string, string> = {
  group: 'Group Stage',
  qf: 'Quarter Finals',
  sf: 'Semi Finals',
  final: '🏆 Final',
}

function RoundSection({ label, matches }: { label: string; matches: Match[] }) {
  if (!matches.length) return null
  return (
    <div className="mb-10">
      <div
        className="mb-4 pb-3"
        style={{
          fontFamily: 'var(--font-head)',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: label.includes('Final') ? '#facc15' : 'var(--orange)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {label}
      </div>
      <div className="flex flex-col gap-2">
        {matches.map(m => <MatchRow key={m.id} match={m} />)}
      </div>
    </div>
  )
}

export default async function FixturesPage({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status || ''
  let data
  try {
    data = await getFixtures(status)
  } catch {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Could not load fixtures.</div>
  }

  const filters = [
    { label: 'All', value: '' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Live', value: 'live' },
    { label: 'Completed', value: 'completed' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHead
        label="All"
        accent="Fixtures"
        count={`${[...data.group, ...data.qf, ...data.sf, ...data.final].length} matches`}
      />

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(f => (
          <Link
            key={f.value}
            href={f.value ? `/fixtures?status=${f.value}` : '/fixtures'}
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: status === f.value ? 'var(--orange)' : 'var(--muted)',
              background: status === f.value ? 'var(--orange-glow)' : 'var(--bg2)',
              border: `1px solid ${status === f.value ? 'rgba(249,115,22,0.4)' : 'var(--border)'}`,
              borderRadius: 99,
              padding: '6px 16px',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <RoundSection label={ROUND_LABELS.group} matches={data.group} />
      <RoundSection label={ROUND_LABELS.qf} matches={data.qf} />
      <RoundSection label={ROUND_LABELS.sf} matches={data.sf} />
      <RoundSection label={ROUND_LABELS.final} matches={data.final} />

      {!data.group.length && !data.qf.length && !data.sf.length && !data.final.length && (
        <div className="text-center py-20" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          No fixtures found.
        </div>
      )}
    </div>
  )
}