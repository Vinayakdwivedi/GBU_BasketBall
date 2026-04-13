from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from matches import views as mv
from gallery import views as gv
from notifications import views as nv

admin.site.site_header = 'Tournament Control Panel'
admin.site.site_title  = 'Tournament Admin'
admin.site.index_title = 'Manage Your Tournament'

urlpatterns = [
    path('admin/',                        admin.site.urls),
    path('api/home/',                     mv.home_data,      name='api-home'),
    path('api/fixtures/',                 mv.fixtures,       name='api-fixtures'),
    path('api/results/',                  mv.results,        name='api-results'),
    path('api/teams/',                    mv.teams_list,     name='api-teams'),
    path('api/teams/<int:team_id>/',      mv.team_detail,    name='api-team-detail'),
    path('api/gallery/',                  gv.gallery_list,   name='api-gallery'),
    path('api/gallery/<int:album_id>/',   gv.album_detail,   name='api-album-detail'),
    path('api/notifications/',            nv.notifications_list, name='api-notifications'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)