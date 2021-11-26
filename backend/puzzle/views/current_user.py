from rest_framework.response import Response
from rest_framework.views import APIView
from puzzle.serializers import AccountSerializer


class CurrentUserView(APIView):
    def get(self, request):
        account_serializer = AccountSerializer(request.user)
        return Response(account_serializer.data)
