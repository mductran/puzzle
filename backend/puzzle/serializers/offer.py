from rest_framework import serializers
from puzzle.models import Offer


class OfferSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source="author.user.username", read_only=True)

    class Meta:
        model = Offer
        fields = ["id", "author_name", "created",
                  "updated", "trade", "note"]

    def create(self, validated_data):
        trade_instance = Offer.objects.create(**validated_data)
        return trade_instance
