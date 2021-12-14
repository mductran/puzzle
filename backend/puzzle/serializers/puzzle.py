from rest_framework import serializers
from puzzle.models import Puzzle

from .collage import CollageSerializer

class PuzzleSerializer(serializers.ModelSerializer):
    collage = CollageSerializer(source="collage", read_only=True)
    
    class Meta:
        model = Puzzle
        fields = ["id", "created", "updated", "name", "box_condition", "material", "collage"]
