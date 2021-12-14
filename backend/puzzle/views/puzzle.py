from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from puzzle.models import Puzzle
from puzzle.serializers import PuzzleSerializer

# Create your views here.


class PuzzleView(ModelViewSet):
    queryset = Puzzle.objects.all()
    serializer_class = PuzzleSerializer
    filter_backends = [DjangoFilterBackend]
