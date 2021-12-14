from rest_framework import serializers
from puzzle.models import Collage

from .image import ImageSerializer


class CollageSerializer(serializers.ModelSerializer):
    images = ImageSerializer(source="image_set", read_only=True, many=True)

    class Meta:
        model = Collage
        fields = "__all__"
