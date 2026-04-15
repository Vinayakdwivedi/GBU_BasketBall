'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Bell, MapPin, Trophy, Calendar, Clock, Users, ExternalLink, ChevronDown } from 'lucide-react'
import { EtheralShadow } from '@/components/ui/etheral-shadow'
import { AnimatePresence, motion } from 'framer-motion'
import type { Tournament, Match, Notification } from '@/types'

/* ── Notification Bell (self-contained in hero) ── */
function HeroBell({ notifications }: { notifications: Notification[] }) {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState<number[]>([])
  const unread = notifications.filter(n => !read.includes(n.id)).length

  const handleOpen = () => {
    if (!open) setRead(notifications.map(n => n.id))
    setOpen(o => !o)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleOpen}
        className="glass"
        style={{
          width: 44, height: 44, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative', border: 'none',
          color: open ? 'var(--orange)' : 'rgba(255,255,255,0.6)',
          transition: 'color 0.15s',
        }}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span style={{
            position: 'absolute', top: 4, right: 4, width: 16, height: 16,
            borderRadius: '50%', background: 'var(--orange)',
            border: '2px solid var(--bg-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 800, color: '#fff',
          }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* close overlay */}
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 40 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="glass-strong"
              style={{
                position: 'absolute', top: 52, right: 0, width: 300,
                borderRadius: 14, overflow: 'hidden', zIndex: 50,
                background: 'rgba(5, 5, 16, 0.85)', /* Make card darker for readability */
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: 11, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase', color: 'var(--muted)',
              }}>
                Notifications
                {notifications.length > 0 && (
                  <span style={{ float: 'right', color: 'var(--orange)' }}>
                    {notifications.length}
                  </span>
                )}
              </div>
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{
                    padding: '28px 16px', textAlign: 'center',
                    fontSize: 13, color: 'var(--muted)',
                  }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((n, i) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: i < notifications.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                      }}
                    >
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: 'var(--orange)', marginTop: 6, flexShrink: 0,
                        boxShadow: '0 0 8px rgba(249,115,22,0.5)',
                      }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>
                          {n.title}
                        </div>
                        {(n.body || n.message) && (
                          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4, marginTop: 2 }}>
                            {n.body || n.message}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Live Score Card ── */
function LiveScoreCard({ match }: { match: Match }) {
  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid rgba(34,197,94,0.15)',
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(34,197,94,0.06)',
      }}>
        <span className="pulse-dot" style={{
          width: 8, height: 8, borderRadius: '50%', background: 'var(--live)',
          display: 'inline-block',
        }} />
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 2,
          textTransform: 'uppercase', color: 'var(--live)',
        }}>
          Live Now
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>
          {match.round_display}
        </span>
      </div>

      {/* Scoreboard */}
      <div style={{ padding: '24px 20px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 }}>
              {match.team_a.name}
            </div>
            {match.team_a.group && (
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
                Group {match.team_a.group}
              </div>
            )}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 900,
              color: 'var(--live)', letterSpacing: -2, lineHeight: 1,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{match.score_a}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.5em' }}>–</span>
              <span>{match.score_b}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 }}>
              {match.team_b.name}
            </div>
            {match.team_b.group && (
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'right' }}>
                Group {match.team_b.group}
              </div>
            )}
          </div>
        </div>
        {match.venue && (
          <div style={{
            marginTop: 16, paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: 'var(--muted)',
          }}>
            <MapPin size={13} /> {match.venue}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Match Result Row ── */
function ResultRow({ match }: { match: Match }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '14px 18px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', gap: 12, borderRadius: 12,
      }}
    >
      <div style={{
        fontSize: 14, fontWeight: 700,
        color: match.winner_id === match.team_a.id ? 'var(--orange)' : 'var(--foreground)',
      }}>
        {match.team_a.name} {match.winner_id === match.team_a.id ? '🏆' : ''}
      </div>
      <div style={{
        fontSize: 18, fontWeight: 900, textAlign: 'center',
        minWidth: 60, letterSpacing: -0.5,
      }}>
        {match.score_a} – {match.score_b}
      </div>
      <div style={{
        fontSize: 14, fontWeight: 700, textAlign: 'right',
        color: match.winner_id === match.team_b.id ? 'var(--orange)' : 'var(--foreground)',
      }}>
        {match.winner_id === match.team_b.id ? '🏆 ' : ''}{match.team_b.name}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN LANDING PAGE CLIENT
═══════════════════════════════════════════ */
interface LandingClientProps {
  tournament: Tournament | null
  notifications: Notification[]
  liveMatch: Match | null
  nextMatch: Match | null
  recentResults: Match[]
  stats: {
    total_teams: number
    total_matches: number
    completed_matches: number
    remaining_matches: number
  }
}

export default function LandingClient({
  tournament, notifications, liveMatch, nextMatch, recentResults, stats,
}: LandingClientProps) {

  const registrationUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSezBZnKFZIqb5Ljti0dmOuFr3rb_9D4vfw03KmEPYWg4z1gmA/viewform?usp=dialog'
  const router = useRouter()

  useEffect(() => {
    // Poll the server for fresh data every 5 seconds.
    // Because revalidate is set to 2s, Next.js will fetch new server data from Django 
    // without doing a full page reload, allowing real-time scoreboard & notifications!
    const interval = setInterval(() => {
      router.refresh()
    }, 5000)
    return () => clearInterval(interval)
  }, [router])

  return (
    <div>
      {/* ═══════════════════════════════════════
          HERO SECTION — Ethereal Shadow Background
      ═══════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Ethereal Shadow Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <EtheralShadow
            color="rgba(249, 115, 22, 0.6)"
            animation={{ scale: 80, speed: 60 }}
            noise={{ opacity: 0.8, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,5,16,0.5) 0%, rgba(5,5,16,0.85) 100%)',
        }} />

        {/* Content */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 stagger-children"
          style={{
            position: 'relative', zIndex: 10,
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 80, paddingBottom: 60,
          }}
        >
          {/* Notification Bell — top right */}
          <div style={{ position: 'absolute', top: 20, right: 16, zIndex: 20 }}>
            <HeroBell notifications={notifications} />
          </div>

          {/* Status badge */}
          <div>
            <span
              className="glass"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 99, fontSize: 12,
                fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                color: tournament?.status === 'ongoing' ? 'var(--live)' : 'var(--orange)',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: tournament?.status === 'ongoing' ? 'var(--live)' : 'var(--orange)',
                display: 'inline-block',
              }} />
              {tournament?.status === 'ongoing' ? 'Live Tournament' :
               tournament?.status === 'upcoming' ? 'Registrations Open' : 'Season ' + (tournament?.year ?? new Date().getFullYear())}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 style={{
              fontSize: 'clamp(52px, 12vw, 130px)',
              fontWeight: 900, lineHeight: 0.9,
              textTransform: 'uppercase', letterSpacing: -3,
              marginTop: 20, marginBottom: 16,
              color: '#fff',
            }}>
              Ball
              <br />
              <span style={{ color: 'var(--orange)' }}>O&apos;Roma</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div>
            <p style={{
              fontSize: 16, color: 'rgba(255,255,255,0.55)',
              maxWidth: 440, lineHeight: 1.6, marginBottom: 24,
            }}>
              {tournament
                ? `${tournament.name} — Live scores, fixtures & results`
                : 'GBU Basketball Tournament — Live scores, fixtures & results'}
            </p>
          </div>

          {/* Venue */}
          {tournament?.venue && (
            <div>
              <div
                className="glass"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px', borderRadius: 12, marginBottom: 20,
                }}
              >
                <MapPin size={16} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                  {tournament.venue}
                </span>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--orange)', color: '#fff',
                padding: '13px 28px', borderRadius: 12,
                fontSize: 14, fontWeight: 700, letterSpacing: 0.5,
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'transform 0.1s, box-shadow 0.15s',
                boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
              }}
            >
              Register Now <ExternalLink size={15} />
            </a>
            <Link
              href="/fixtures"
              className="glass"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: 'rgba(255,255,255,0.8)', padding: '13px 28px',
                borderRadius: 12, fontSize: 14, fontWeight: 700,
                letterSpacing: 0.5, textTransform: 'uppercase',
                textDecoration: 'none', transition: 'background 0.15s',
              }}
            >
              View Fixtures
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 4, opacity: 0.35,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fff' }}>
            Scroll
          </span>
          <ChevronDown size={16} style={{ animation: 'bounce 1.5s infinite' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BELOW HERO — Data Sections
      ═══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6" style={{ paddingTop: 48, paddingBottom: 48 }}>

        {/* ── LIVE MATCH (if any) ── */}
        {liveMatch && (
          <div className="animate-fade-in" style={{ marginBottom: 40 }}>
            <LiveScoreCard match={liveMatch} />
          </div>
        )}

        {/* ── NEXT MATCH ── */}
        {nextMatch && (
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: 'var(--muted)',
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Calendar size={14} style={{ color: 'var(--orange)' }} />
              Up Next · {nextMatch.round_display}
            </div>
            <div className="glass-card" style={{ padding: '22px 20px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.2, marginBottom: 14 }}>
                {nextMatch.team_a.name}
                <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 16 }}> vs </span>
                {nextMatch.team_b.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={14} style={{ color: 'var(--orange)' }} />
                  <strong style={{ color: 'var(--foreground)' }}>
                    {new Date(nextMatch.scheduled_datetime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={14} style={{ color: 'var(--orange)' }} />
                  <strong style={{ color: 'var(--foreground)' }}>
                    {new Date(nextMatch.scheduled_datetime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </strong>
                </span>
                {nextMatch.venue && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MapPin size={14} style={{ color: 'var(--orange)' }} />
                    <strong style={{ color: 'var(--foreground)' }}>{nextMatch.venue}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STATS ROW ── */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase', color: 'var(--muted)',
            marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Trophy size={14} style={{ color: 'var(--orange)' }} />
            At a Glance
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 10,
          }}>
            {[
              { n: stats.total_teams, l: 'Teams', icon: <Users size={16} /> },
              { n: stats.total_matches, l: 'Matches', icon: <Calendar size={16} /> },
              { n: stats.completed_matches, l: 'Played', icon: <Trophy size={16} /> },
              { n: stats.remaining_matches, l: 'Remaining', icon: <Clock size={16} /> },
            ].map(({ n, l, icon }) => (
              <div key={l} className="glass-card" style={{ padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ color: 'var(--orange)', marginBottom: 6, display: 'flex', justifyContent: 'center' }}>
                  {icon}
                </div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{n}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                  textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4,
                }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RECENT RESULTS ── */}
        {recentResults.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 14,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase', color: 'var(--muted)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Trophy size={14} style={{ color: 'var(--orange)' }} />
                Recent Results
              </span>
              <Link href="/results" style={{
                fontSize: 12, fontWeight: 700, letterSpacing: 1,
                textTransform: 'uppercase', color: 'var(--orange)',
                textDecoration: 'none',
              }}>
                View all →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentResults.map(match => (
                <ResultRow key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS FEED ── */}
        {notifications.length > 0 && (
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: 'var(--muted)',
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Bell size={14} style={{ color: 'var(--orange)' }} />
              Latest Updates
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {notifications.slice(0, 5).map(n => (
                <div key={n.id} className="glass-card" style={{ padding: '16px 18px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--orange)', marginTop: 5, flexShrink: 0,
                      boxShadow: '0 0 8px rgba(249,115,22,0.4)',
                    }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>
                        {n.title}
                      </div>
                      {(n.body || n.message) && (
                        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginTop: 3 }}>
                          {(n.body || n.message || '').slice(0, 150)}
                          {(n.body || n.message || '').length > 150 ? '…' : ''}
                        </div>
                      )}
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontWeight: 600 }}>
                        {new Date(n.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
