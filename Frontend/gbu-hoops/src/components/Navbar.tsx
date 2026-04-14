'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/',              label: 'Home' },
  { href: '/fixtures',      label: 'Fixtures' },
  { href: '/results',       label: 'Results' },
  { href: '/teams',         label: 'Teams' },
  { href: '/gallery',       label: 'Gallery' },
  { href: '/notifications', label: 'Notices' },
]

export default function Navbar({ hasLive }: { hasLive?: boolean }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav
        className="sticky top-0 z-50 glass"
        style={{
          borderRadius: 0,
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-1">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 mr-auto no-underline"
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 18,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: 0.5,
            }}
          >
            <span
              className="relative inline-flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 24, height: 24, background: 'var(--orange)' }}
            >
              <svg width="24" height="24" viewBox="0 0 22 22" fill="none" className="absolute inset-0">
                <circle cx="11" cy="11" r="11" fill="#f97316"/>
                <path d="M11 0 Q11 22 11 22" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none"/>
                <path d="M0 11 Q22 11 22 11" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none"/>
                <path d="M2 5 Q11 11 20 17" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none"/>
                <path d="M2 17 Q11 11 20 5" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none"/>
              </svg>
            </span>
            <span>
              Ball <span style={{ color: 'var(--orange)' }}>O&apos;Roma</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: active ? '#fff' : 'var(--muted)',
                    textDecoration: 'none',
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: active ? 'rgba(249,115,22,0.15)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {label}
                </Link>
              )
            })}

            {/* Live badge */}
            {hasLive && (
              <Link
                href="/"
                className="flex items-center gap-1.5 ml-2"
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--live)',
                  background: 'var(--live-glow)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  padding: '4px 12px',
                  borderRadius: 99,
                  textDecoration: 'none',
                }}
              >
                <span
                  className="pulse-dot rounded-full"
                  style={{ width: 6, height: 6, background: 'var(--live)', display: 'inline-block' }}
                />
                Live
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              background: mobileOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ top: 56 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu */}
          <div
            className="glass-strong animate-fade-in"
            style={{
              position: 'relative',
              margin: '8px 12px',
              padding: '8px',
              borderRadius: 16,
            }}
          >
            <div className="stagger-children flex flex-col gap-0.5">
              {links.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      color: active ? '#fff' : 'var(--muted2)',
                      textDecoration: 'none',
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: active ? 'rgba(249,115,22,0.12)' : 'transparent',
                      display: 'block',
                      transition: 'background 0.1s',
                    }}
                  >
                    {label}
                  </Link>
                )
              })}

              {hasLive && (
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--live)',
                    padding: '12px 16px',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    className="pulse-dot rounded-full"
                    style={{ width: 8, height: 8, background: 'var(--live)', display: 'inline-block' }}
                  />
                  Live Match
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}