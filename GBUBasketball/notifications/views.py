from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Notifications
from .serializers import Notificationserializer


@api_view(['GET'])
def notifications_list(request):
    qs = Notifications.objects.all()
    return Response(Notificationserializer(qs, many=True).data)