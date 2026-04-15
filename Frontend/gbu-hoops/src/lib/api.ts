import type { HomeData, Match, Team, FixturesData, Album, Notification } from '../types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '')

async function apiFetch<T>(path: string, revalidate = 30): Promise<T> {
  if (!API_BASE) {
    throw new Error('Missing NEXT_PUBLIC_API_URL. Set it in your deployment environment.')
  }

  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`API error: ${res.status} on ${path}`)
  return res.json()
}

export const getHomeData      = () => apiFetch<HomeData>('/api/home/', 2)
export const getFixtures      = (status = '') => apiFetch<FixturesData>(`/api/fixtures/${status ? `?status=${status}` : ''}`, 60)
export const getResults       = () => apiFetch<Match[]>('/api/results/', 60)
export const getTeams         = () => apiFetch<Team[]>('/api/teams/', 300)
export const getTeam          = (id: number) => apiFetch<{ team: Team; matches: Match[] }>(`/api/teams/${id}/`, 300)
export const getGallery       = () => apiFetch<Album[]>('/api/gallery/', 300)
export const getAlbum         = (id: number) => apiFetch<Album>(`/api/gallery/${id}/`, 300)
export const getNotifications = async () => {
  const data = await apiFetch<any>('/api/notifications/', 2)
  return Array.isArray(data) ? data : (data.results || data.notifications || [])
}