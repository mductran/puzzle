from rest_framework.viewsets import ModelViewSet
from puzzle.models import Collage
from puzzle.serializers import CollageSerializer

# Create your views here.


class CollageView(ModelViewSet):
    queryset = Collage.objects.all()
    serializer_class = CollageSerializer
