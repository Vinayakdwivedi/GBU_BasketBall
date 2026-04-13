from django.contrib import admin
from .models import Tournament, Team, Player, Match


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ['name', 'year', 'venue', 'status']
    list_editable = ['status']
    list_filter = ['status', 'year']
    search_fields = ['name', 'venue']
    
class PlayerInline(admin.TabularInline):
    model = Player
    extra = 5
    fields = ['name', 'jersey_number', 'position']
    
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'tournament', 'group']
    list_filter = ['tournament', 'group']
    search_fields = ['name']
    inlines = [PlayerInline]
    
@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['jersey_number', 'name', 'team', 'position']
    list_filter = ['team', 'position']
    search_fields = ['name']
    ordering = ['team', 'jersey_number']
    
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = [
        'team_a', 'score_a', 'score_b', 'team_b',
        'round', 'status', 'scheduled_datetime'
    ]
    list_editable = ['score_a', 'score_b', 'status']
    list_filter = ['tournament', 'status', 'round']
    search_fields = ['team_a__name', 'team_b__name']
    ordering = ['scheduled_datetime']
    
    fieldsets = (
        ('Teams', {
            'fields': ('tournament', ('team_a', 'team_b'))
        }),
        ('Score', {
            'fields': (('score_a', 'score_b'),)
        }),
        ('Match Details', {
            'fields': ('round', 'status', 'scheduled_datetime', 'venue')
        }),
    )