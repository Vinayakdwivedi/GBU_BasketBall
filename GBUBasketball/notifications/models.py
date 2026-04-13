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