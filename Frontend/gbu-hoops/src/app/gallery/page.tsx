import { getGallery } from '@/lib/api'
import { SectionHead } from '@/components/UI'
import Link from 'next/link'

export const revalidate = 300

export default async function GalleryPage() {
  let albums
  try {
    albums = await getGallery()
  } catch {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Could not load gallery.</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHead label="Photo" accent="Gallery" count={`${albums?.length || 0} albums`} />

      {(!albums || albums.length === 0) && (
        <div className="text-center py-20" style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          No photos uploaded yet. Check back soon!
        </div>
      )}

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {albums?.map(album => (
          <Link key={album.id} href={`/gallery/${album.id}`} style={{ textDecoration: 'none' }}>
            <div
              // Removed JS event handlers and added Tailwind hover classes here!
              // hover:-translate-y-[3px] lifts it up, hover:border-[var(--orange)] changes the border
              className="rounded-xl overflow-hidden transition-all duration-150 hover:-translate-y-[3px] hover:border-[var(--orange)]"
              style={{ 
                background: 'var(--bg2)', 
                border: '1px solid var(--border)' 
              }}
            >
              {/* Cover */}
              {album.cover ? (() => {
                const baseUrl = 'http://127.0.0.1:8000';
                const imgSrc = album.cover.startsWith('http') 
                  ? album.cover 
                  : `${baseUrl}${album.cover.startsWith('/') ? '' : '/'}${album.cover}`;
                return (
                  <img
                    src={imgSrc}
                    alt={album.title}
                    style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                  />
                );
              })() : (
                <div style={{ width: '100%', height: 200, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, borderBottom: '1px solid var(--border)' }}>
                  📸
                </div>
              )}

              {/* Info */}
              <div className="p-5">
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, lineHeight: 1.2, color: 'var(--white)', marginBottom: 6 }}>
                  {album.title}
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {album.tournament_name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--orange)' }}>
                    {album.photo_count} photos
                  </span>
                </div>
                {album.description && (
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>
                    {album.description.slice(0, 80)}{album.description.length > 80 ? '…' : ''}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}