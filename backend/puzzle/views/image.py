from rest_framework.viewsets import ModelViewSet
from puzzle.models import Image
from puzzle.serializers import ImageSerializer

# Create your views here.


class ImageView(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
