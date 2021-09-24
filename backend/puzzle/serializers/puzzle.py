from rest_framework import serializers
from puzzle.models import Puzzle


class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puzzle
        fields = "__all__"
