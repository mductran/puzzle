from rest_framework_simplejwt.views import TokenObtainPairView
from puzzle.serializers import TokenSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenSerializer
