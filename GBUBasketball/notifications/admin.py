from django.contrib import admin
from .models import Notifications


@admin.register(Notifications)
class NotificationsAdmin(admin.ModelAdmin):
    list_display = ['title', 'target', 'is_pinned', 'created_at']
    list_editable = ['is_pinned']
    list_filter = ['target', 'is_pinned']
    search_fields = ['title', 'body']
    readonly_fields = ['created_at']
    ordering = ['-is_pinned', '-created_at']
    
    actions = ['pin_notifications', 'unpin_notifications']
    
    def pin_notifications(self, request, queryset):
        queryset.update(is_pinned=True)
    
    def unpin_notifications(self, request, queryset):
        queryset.update(is_pinned=False)
    
    pin_notifications.short_description = 'Pin selected notifications'
    unpin_notifications.short_description = 'Unpin selected notifications'