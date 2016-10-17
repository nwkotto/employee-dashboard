from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

import serializers

class CurrentUserView(APIView):
    def get(self, request):
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data)
