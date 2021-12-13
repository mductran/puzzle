from rest_framework import serializers
from puzzle.models.offer import Offer
from puzzle.models import Trade

from .offer import OfferSerializer


class TradeSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source="author.user.username", read_only=True)
    item_name = serializers.CharField(source="item.name", read_only=True)
    offers = OfferSerializer(source="offer_set", read_only=True, many=True)

    class Meta:
        model = Trade
        fields = ["id", "author_name", "offers", "created",
                  "updated", "item_name", "note"]

    def create(self, validated_data):
        trade_instance = Trade.objects.create(**validated_data)
        return trade_instance
