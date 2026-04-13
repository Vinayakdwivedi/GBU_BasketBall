from rest_framework import serializers
from .models import Album, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'caption', 'uploaded_at']


class AlbumSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    photo_count = serializers.SerializerMethodField()
    tournament_name = serializers.CharField(source='tournament.name', read_only=True)
    cover = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ['id', 'title', 'description', 'tournament_name', 'photo_count', 'cover', 'photos', 'created_at']

    def get_photo_count(self, obj):
        return obj.photos.count()

    def get_cover(self, obj):
        request = self.context.get('request')
        if obj.cover_photo:
            return request.build_absolute_uri(obj.cover_photo.url) if request else obj.cover_photo.url
        first = obj.photos.first()
        if first:
            return request.build_absolute_uri(first.image.url) if request else first.image.url
        return None