from rest_framework import serializers
from .models import Notifications


class Notificationserializer(serializers.ModelSerializer):
    target_display = serializers.CharField(source='get_target_display', read_only=True)

    class Meta:
        model = Notifications
        fields = ['id', 'title', 'body', 'is_pinned', 'target', 'target_display', 'created_at']