from typing_extensions import TypeVarTuple
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from puzzle.models import Offer
from puzzle.serializers import OfferSerializer

from puzzle.models import Account


class OfferView(ModelViewSet):
    queryset = Offer.objects.all().order_by("-updated")
    serializer_class = OfferSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = []
    ordering_fields = ["updated", ]

    def create(self, request, *args, **kwargs):
        this_serializer = self.get_serializer(data=request.data)
        if this_serializer.is_valid(raise_exception=True):
            try:
                author = Account.objects.get(id=request.data['author_id'])
                data = this_serializer.data
                data['author_id'] = author.user.id
                new_offer = Offer.objects.create(**data)
                data['author_name'] = author.user.username
                data['id'] = new_offer.id
                return Response(data, status=status.HTTP_201_CREATED)
            except (Account.DoesNotExist):
                return Response(status=status.HTTP_400_BAD_REQUEST)
