import { getAlbum } from '../../../lib/api'
import AlbumDetailClient from './AlbumDetailClient'

export const revalidate = 300

export default async function AlbumDetailPage({ params }: { params: { id: string } }) {
  let album
  try {
    album = await getAlbum(Number(params.id))
  } catch {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center"
        style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>
        Album not found.
      </div>
    )
  }

  return <AlbumDetailClient album={album} />
}

export async function generateStaticParams() {
  // Use the environment variable in Vercel, but fall back to localhost for local development
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  const res = await fetch(`${baseUrl}/api/gallery/`);
  const albums = await res.json();
  
  return albums.map((album: { id: number }) => ({
    id: String(album.id),
  }));
}