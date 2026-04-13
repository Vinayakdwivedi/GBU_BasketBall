from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Album, Photo
from .serializers import AlbumSerializer, PhotoSerializer


@api_view(['GET'])
def gallery_list(request):
    albums = Album.objects.select_related('tournament').prefetch_related('photos').order_by('-created_at')
    return Response(AlbumSerializer(albums, many=True, context={'request': request}).data)


@api_view(['GET'])
def album_detail(request, album_id):
    album = get_object_or_404(Album, id=album_id)
    return Response(AlbumSerializer(album, context={'request': request}).data)