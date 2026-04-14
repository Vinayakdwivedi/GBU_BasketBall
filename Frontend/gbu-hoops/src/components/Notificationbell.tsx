'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Notification } from '@/types'

interface Props {
  notifications: Notification[]
}

export default function NotificationBell({ notifications }: Props) {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  const unread = notifications.filter(n => !read.includes(n.id)).length

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleOpen = () => {
    setOpen(o => !o)
    // mark all as read when opened
    if (!open) setRead(notifications.map(n => n.id))
  }

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 50 }}>
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        style={{
          position: 'relative',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: open ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${open ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Bell SVG */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={open ? '#f97316' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread Badge */}
        <AnimatePresence>
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#f97316',
                border: '2px solid var(--bg1, #0a0a0a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'var(--font-head)',
              }}
            >
              {unread > 9 ? '9+' : unread}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 54,
              right: 0,
              width: 320,
              borderRadius: 16,
              background: 'rgba(15,15,20,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.1)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: 'var(--font-head)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#94a3b8',
              }}>
                Notifications
              </span>
              {notifications.length > 0 && (
                <span style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#f97316',
                }}>
                  {notifications.length} total
                </span>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: 360, overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '32px 18px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-head)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#475569',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  No notifications
                </div>
              ) : (
                notifications.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      padding: '13px 18px',
                      borderBottom: i < notifications.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#f97316',
                      marginTop: 5,
                      flexShrink: 0,
                      boxShadow: '0 0 6px rgba(249,115,22,0.6)',
                    }} />
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-head)',
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#f1f5f9',
                        lineHeight: 1.3,
                        marginBottom: 3,
                      }}>
                        {n.title}
                      </div>
                      {n.message && (
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 12,
                          color: '#64748b',
                          lineHeight: 1.5,
                        }}>
                          {n.message}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}