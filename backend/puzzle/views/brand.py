from rest_framework.viewsets import ModelViewSet
from puzzle.models import Brand
from puzzle.serializers import BrandSerializer

# Create your views here.


class BrandView(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
