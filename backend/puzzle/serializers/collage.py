from rest_framework import serializers
from puzzle.models import Collage


class CollageSerializer(serializers.ModelSerializer):
    image_id = serializers.IntegerField(source="image.id", read_only=True)
    image_caption = serializers.CharField(source="image.caption", read_only=True)
    image_url = serializers.URLField(source="image.url", read_only=True)

    class Meta:
        model = Collage
        fields = "__all__"
