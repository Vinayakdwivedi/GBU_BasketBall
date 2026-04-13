from django.db import models
from django.core.validators import RegexValidator



class Tournament(models.Model):
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    venue = models.CharField(max_length=200)
    
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    
    def __str__(self):
        return f"{self.name} ({self.year})"
    
class Team(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='teams')
    name = models.CharField(max_length=150)
    logo = models.ImageField(upload_to='team_logos/', blank=True, null=True)
    group = models.CharField(max_length=10, blank=True)  # e.g. "A", "B"
    
    def __str__(self):
        return self.name

class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    name = models.CharField(max_length=150)
    jersey_number = models.IntegerField()
    position = models.CharField(max_length=50, blank=True)  # PG, SG, SF, PF, C
    contact = models.CharField(
    max_length=10,
    validators=[RegexValidator(r'^\d{10}$', 'Enter a valid 10-digit number')],
    blank=True
    )
    
    def __str__(self):
        return f"#{self.jersey_number} {self.name} ({self.team.name})"
    
class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    team_a = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    team_b = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    
    score_a = models.IntegerField(default=0)
    score_b = models.IntegerField(default=0)
    
    ROUND_CHOICES = [
        ('group', 'Group Stage'),
        ('qf', 'Quarter Final'),
        ('sf', 'Semi Final'),
        ('final', 'Final'),
    ]
    round = models.CharField(max_length=20, choices=ROUND_CHOICES, default='group')
    
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('live', 'Live'),
        ('completed', 'Completed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    
    scheduled_datetime = models.DateTimeField()
    venue = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"{self.team_a} vs {self.team_b} | {self.get_round_display()} | {self.status}"
    
    def winner(self):
        if self.status == 'completed':
            if self.score_a > self.score_b:
                return self.team_a
            elif self.score_b > self.score_a:
                return self.team_b
        return None