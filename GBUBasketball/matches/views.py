from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tournament, Team, Match
from .serializers import TournamentSerializer, TeamSerializer, MatchSerializer
from notifications.models import Notifications
from notifications.serializers import Notificationserializer


@api_view(['GET'])
def home_data(request):
    tournament = Tournament.objects.filter(status='ongoing').first() \
                 or Tournament.objects.order_by('-year').first()

    live_match     = Match.objects.select_related('team_a','team_b').filter(status='live').first()
    next_match     = Match.objects.select_related('team_a','team_b').filter(status='scheduled').order_by('scheduled_datetime').first()
    recent_results = Match.objects.select_related('team_a','team_b').filter(status='completed').order_by('-scheduled_datetime')[:5]
    pinned_notif   = Notifications.objects.filter(is_pinned=True).first()

    return Response({
        'tournament':       TournamentSerializer(tournament).data if tournament else None,
        'live_match':       MatchSerializer(live_match).data if live_match else None,
        'next_match':       MatchSerializer(next_match).data if next_match else None,
        'recent_results':   MatchSerializer(recent_results, many=True).data,
        'pinned_notifications': Notificationserializer(pinned_notif).data if pinned_notif else None,
        'stats': {
            'total_teams':       Team.objects.count(),
            'total_matches':     Match.objects.count(),
            'completed_matches': Match.objects.filter(status='completed').count(),
            'remaining_matches': Match.objects.filter(status='scheduled').count(),
        }
    })


@api_view(['GET'])
def fixtures(request):
    status = request.GET.get('status', '')
    qs = Match.objects.select_related('team_a', 'team_b').order_by('scheduled_datetime')
    if status:
        qs = qs.filter(status=status)

    return Response({
        'group':  MatchSerializer(qs.filter(round='group'),  many=True).data,
        'qf':     MatchSerializer(qs.filter(round='qf'),     many=True).data,
        'sf':     MatchSerializer(qs.filter(round='sf'),     many=True).data,
        'final':  MatchSerializer(qs.filter(round='final'),  many=True).data,
    })


@api_view(['GET'])
def results(request):
    qs = Match.objects.select_related('team_a','team_b').filter(status='completed').order_by('-scheduled_datetime')
    return Response(MatchSerializer(qs, many=True).data)


@api_view(['GET'])
def teams_list(request):
    qs = Team.objects.prefetch_related('players').all()
    return Response(TeamSerializer(qs, many=True).data)


@api_view(['GET'])
def team_detail(request, team_id):
    from django.shortcuts import get_object_or_404
    from django.db.models import Q
    team    = get_object_or_404(Team, id=team_id)
    matches = Match.objects.filter(Q(team_a=team) | Q(team_b=team)).select_related('team_a','team_b').order_by('-scheduled_datetime')
    return Response({
        'team':    TeamSerializer(team).data,
        'matches': MatchSerializer(matches, many=True).data,
    })