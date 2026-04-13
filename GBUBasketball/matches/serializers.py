from rest_framework import serializers
from .models import Tournament, Team, Player, Match


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'jersey_number', 'position']


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'logo', 'group', 'players']


class MatchSerializer(serializers.ModelSerializer):
    team_a = TeamSerializer(read_only=True)
    team_b = TeamSerializer(read_only=True)
    round_display  = serializers.CharField(source='get_round_display',  read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    winner_id = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = [
            'id', 'team_a', 'team_b',
            'score_a', 'score_b',
            'round', 'round_display',
            'status', 'status_display',
            'scheduled_datetime', 'venue',
            'winner_id',
        ]

    def get_winner_id(self, obj):
        w = obj.winner()
        return w.id if w else None


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'year', 'venue', 'status']