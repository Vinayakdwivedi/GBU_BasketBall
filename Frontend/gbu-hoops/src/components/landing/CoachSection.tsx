'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CoachParallaxSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax logic for the name fade in
    if (!contentRef.current) return
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        scrollTrigger: {
          trigger: '#coach-section',
          start: 'top 30%', 
          end: 'top 10%',
          scrub: true
        }
      }
    )
  }, [])

  return (
    <section 
      id="coach-section"
      style={{
        height: '100vh',
        position: 'sticky',
        bottom: 0,
        zIndex: 1, // Must be lower than sections above
        background: '#020617', // To match dark transition if needed
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img 
        src="/coach_photo.png" 
        alt="Coach" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6
        }}
      />
      
      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}
      >
        <span style={{ color: 'var(--orange)', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', fontSize: 14 }}>
          Head Coach
        </span>
        <h1 style={{ color: 'white', fontSize: 'clamp(50px, 10vw, 120px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, marginTop: 10 }}>
          John Doe
        </h1>
      </div>
    </section>
  )
}
