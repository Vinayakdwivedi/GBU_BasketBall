from django.contrib import admin
from .models import Album, Photo


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 3
    fields = ['image', 'caption']
    readonly_fields = ['uploaded_at']
    
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['title', 'tournament', 'photo_count', 'created_at']
    list_filter = ['tournament']
    search_fields = ['title']
    inlines = [PhotoInline]
    readonly_fields = ['created_at']
    
    def photo_count(self, obj):
        return obj.photos.count()
    
    photo_count.short_description = 'Photos'
    
@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'album', 'uploaded_at']
    list_filter = ['album__tournament', 'album']
    search_fields = ['caption']
    readonly_fields = ['uploaded_at']
    ordering = ['-uploaded_at']