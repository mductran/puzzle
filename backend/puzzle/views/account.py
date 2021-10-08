from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from puzzle.models import Account
from puzzle.serializers import AccountSerializer


class AccountView(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=False, methods=['get'])
    def current(self, request, pk=None):
        assert request.user, "User is not logon"
        return Response(AccountSerializer(Account.objects.filter(user__pk=request.user.id).get()).data, status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            refresh_token = RefreshToken.for_user(user)
            return Response({
                "user": serializer.data,
                "refresh": str(refresh_token),
                "access": str(refresh_token.access_token)
            }, status=status.HTTP_201_CREATED)
