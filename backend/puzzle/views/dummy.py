from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from pprint import pprint

class InterceptCookieView(APIView):
    def get(self, request, format=None):
        print('\n\n')
        pprint(request.headers)
        print('\n\n')
        pprint(request.headers['Cookie'].split(' ; '))
        print('\n\n{}\n\n'.format(request.body))
        
        return res
