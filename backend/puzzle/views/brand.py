from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter

from puzzle.models import Brand
from puzzle.serializers import BrandSerializer

# Create your views here.


class BrandView(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filter_backends = [SearchFilter, ]
    search_fields = ['name']
    ordering_fields = ['name']
