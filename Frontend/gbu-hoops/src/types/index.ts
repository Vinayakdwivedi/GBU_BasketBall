export interface Tournament {
  id: number
  name: string
  year: number
  venue: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

export interface Player {
  id: number
  name: string
  jersey_number: number
  position: string
}

export interface Team {
  id: number
  name: string
  logo: string | null
  group: string
  players: Player[]
}

export interface Match {
  id: number
  team_a: Team
  team_b: Team
  score_a: number
  score_b: number
  round: 'group' | 'qf' | 'sf' | 'final'
  round_display: string
  status: 'scheduled' | 'live' | 'completed'
  status_display: string
  scheduled_datetime: string
  venue: string
  winner_id: number | null
}

export interface Notification {
  id: number
  title: string
  body: string
  message?: string
  is_pinned: boolean
  target: string
  target_display: string
  created_at: string
}

export interface Photo {
  id: number
  image: string
  caption: string
  uploaded_at: string
}

export interface Album {
  id: number
  title: string
  description: string
  tournament_name: string
  photo_count: number
  cover: string | null
  photos: Photo[]
  created_at: string
}

export interface HomeData {
  tournament: Tournament | null
  live_match: Match | null
  next_match: Match | null
  recent_results: Match[]
  pinned_notification: Notification | null
  stats: {
    total_teams: number
    total_matches: number
    completed_matches: number
    remaining_matches: number
  }
}

export interface FixturesData {
  group: Match[]
  qf: Match[]
  sf: Match[]
  final: Match[]
}
