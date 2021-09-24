from rest_framework.viewsets import ModelViewSet
from puzzle.models import Puzzle
from puzzle.serializers import PuzzleSerializer

# Create your views here.


class PuzzleView(ModelViewSet):
    queryset = Puzzle.objects.all()
    serializer_class = PuzzleSerializer
