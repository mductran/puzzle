from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from puzzle.models import Account
from puzzle.serializers import AccountSerializer


class AccountView(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=False, methods=['get'])
    def current(self, request, pk=None):
        assert request.user, "User is not logon"
        return Response(AccountSerializer(Account.objects.filter(user__pk=request.user.id).get()).data, status.HTTP_200_OK)
