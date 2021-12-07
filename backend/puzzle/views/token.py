from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken(
                'No valid token found in cookie \'refresh_token\'')


# TODO: add flag secure=True for obtain and refresh view
class CookieTokenObtainPairView(TokenObtainPairView):
  def finalize_response(self, request, response, *args, **kwargs):
    if response.data.get('refresh'):
        access_max_age = 60 * 15
        refresh_max_age = 60 * 60 * 12  # 12 hours
        response.set_cookie(
            'refresh_token', response.data['refresh'], max_age=refresh_max_age, httponly=True)
        del response.data['refresh']
    if response.data.get('access'):
        response.set_cookie(
            'access_token', response.data['access'], max_age=access_max_age)

    # response["Access-Control-Allow-Headers"] = "Set-Cookie"
    # response["Access-Control-Allow-Origin"] = "http://localhost:8080"
    # response["Access-Control-Expose-Headers"] = "Set-Cookie"

    return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            access_max_age =  60 * 15
            refresh_max_age = 60 * 60 * 12  # 12 hours
            response.set_cookie(
                'refresh_token', response.data['refresh'], max_age=refresh_max_age, httponly=True)
            response.set_cookie('access_token', response.data['access'])
            del response.data['refresh']
        if response.data.get('access'):
            response.set_cookie('access_token', response.data['access'], max_age=access_max_age)

        # response["Access-Control-Allow-Origin"] = "http://localhost:8080"
        # response["Access-Control-Allow-Headers"] = "Set-Cookie"
        # response["Access-Control-Expose-Headers"] = "Set-Cookie"

        return super().finalize_response(request, response, *args, **kwargs)
