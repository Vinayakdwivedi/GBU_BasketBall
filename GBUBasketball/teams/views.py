from django.shortcuts import render, get_object_or_404
from matches.models import Team, Match
from notifications.models import Notifications
from django.db import models
 
 
def teams_list(request):
    teams = Team.objects.select_related('tournament').prefetch_related('players').all()
    pinned_notif = Notifications.objects.filter(is_pinned=True).first()
    live_match   = Match.objects.filter(status='live').first()
 
    return render(request, 'teams/teams_list.html', {
        'teams':               teams,
        'pinned_notifications': pinned_notif,
        'live_match':          live_match,
    })
 
 
def team_detail(request, team_id):
    team    = get_object_or_404(Team, id=team_id)
    players = team.players.order_by('jersey_number')
 
    team_matches = Match.objects.filter(
        models.Q(team_a=team) | models.Q(team_b=team)
    ).select_related('team_a', 'team_b').order_by('-scheduled_datetime')
 
    pinned_notif = Notifications.objects.filter(is_pinned=True).first()
    live_match   = Match.objects.filter(status='live').first()
 
    return render(request, 'teams/team_detail.html', {
        'team':                team,
        'players':             players,
        'team_matches':        team_matches,
        'pinned_notifications': pinned_notif,
        'live_match':          live_match,
    })
 