import { getAlbum } from '../../../lib/api'
import AlbumDetailClient from './AlbumDetailClient'

export const dynamic = 'force-dynamic'

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
