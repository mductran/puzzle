from rest_framework.viewsets import ModelViewSet
from puzzle.models import Theme
from puzzle.serializers import ThemeSerializer

# Create your views here.


class ThemeView(ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
