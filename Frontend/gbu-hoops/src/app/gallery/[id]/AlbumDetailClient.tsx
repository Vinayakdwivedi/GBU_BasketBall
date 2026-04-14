'use client'
import { useEffect, useState } from 'react'
import { Album } from '../../../types'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export default function AlbumDetailClient({ album }: { album: Album }) {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  const imgSrc = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    const baseUrl = API.endsWith('/') ? API.slice(0, -1) : API
    const path = url.startsWith('/') ? url : `/${url}`
    return `${baseUrl}${path}`
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/gallery" style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
        ← Gallery
      </Link>

      <div className="mb-9">
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(36px, 6vw, 58px)', fontWeight: 900, lineHeight: 1, textTransform: 'uppercase', marginBottom: 8 }}>
          {album.title}
        </h1>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', gap: 12 }}>
          <span>{album.tournament_name}</span>
          <span>·</span>
          <span style={{ color: 'var(--orange)' }}>{album.photo_count} Photos</span>
        </div>
        {album.description && (
          <p style={{ marginTop: 10, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.6 }}>{album.description}</p>
        )}
      </div>

      {album.photos.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>
          No photos in this album yet.
        </div>
      ) : (
        <div style={{ columns: 3, columnGap: 12 }}>
          {album.photos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setLightbox({ src: imgSrc(photo.image), caption: photo.caption })}
              style={{ breakInside: 'avoid', marginBottom: 12, borderRadius: 8, overflow: 'hidden', cursor: 'zoom-in' }}
            >
              <img
                src={imgSrc(photo.image)}
                alt={photo.caption || 'Photo'}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s, filter 0.3s', filter: 'brightness(0.9)' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
                  ;(e.currentTarget as HTMLElement).style.filter = 'brightness(1)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                  ;(e.currentTarget as HTMLElement).style.filter = 'brightness(0.9)'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'zoom-out' }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', top: 20, right: 24, fontSize: 28, color: 'var(--muted)', cursor: 'pointer', background: 'none', border: 'none', lineHeight: 1 }}
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.caption}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, cursor: 'default' }}
          />
          {lightbox.caption && (
            <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              {lightbox.caption}
            </div>
          )}
        </div>
      )}
    </div>
  )
}