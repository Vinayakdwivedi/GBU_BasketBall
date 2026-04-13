from django.db import models
from matches.models import Tournament

class Album(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='albums')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    cover_photo = models.ImageField(upload_to='album_covers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} — {self.tournament}"
    
class Photo(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='gallery/%Y/%m/')
    caption = models.CharField(max_length=300, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Photo in {self.album.title} — {self.uploaded_at.strftime('%d %b %Y')}"

from django.db import models

class Notifications(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    is_pinned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    TARGET_CHOICES = [
        ('all', 'All Participants'),
        ('players', 'Players Only'),
        ('coaches', 'Coaches Only'),
    ]
    target = models.CharField(max_length=20, choices=TARGET_CHOICES, default='all')
    
    class Meta:
        ordering = ['-is_pinned', '-created_at']
    
    def __str__(self):
        return f"{'[PINNED] ' if self.is_pinned else ''}{self.title}"
    
