'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  images: string[]  // full URLs
}

export default function HeroSlider({ images }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => {
      setCurrent(i => (i + 1) % images.length)
    }, 3000)
    return () => clearInterval(t)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 72,
      overflow: 'hidden',
      borderRadius: 12,
      marginTop: 40,
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--bg1,#0a0a0a) 0%, transparent 12%, transparent 88%, var(--bg1,#0a0a0a) 100%)',
      }} />

      {/* Scrolling strip */}
      <motion.div
        animate={{ x: `-${current * 84}px` }}
        transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
        style={{
          display: 'flex',
          gap: 12,
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* Duplicate images to create infinite feel */}
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            style={{
              width: 72,
              height: 72,
              flexShrink: 0,
              borderRadius: 10,
              overflow: 'hidden',
              border: i % images.length === current % images.length
                ? '2px solid rgba(249,115,22,0.8)'
                : '2px solid rgba(255,255,255,0.08)',
              opacity: i % images.length === current % images.length ? 1 : 0.5,
              transform: i % images.length === current % images.length ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </motion.div>

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: -22,
        left: 0,
        fontFamily: 'var(--font-head)',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'rgba(148,163,184,0.5)',
      }}>
        Gallery · {images.length} photos
      </div>
    </div>
  )
}