from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from django.views import View
from django.shortcuts import redirect, get_object_or_404


from .serializers import CreateUrlSerializer
from .models import Url


class CreateShortURL(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data
        ser_data = CreateUrlSerializer(data=data)

        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)

        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class RenderShortedURL(View):

    def get(self, request, short_url):

        url = get_object_or_404(Url, short_url=short_url)
        url.visits += 1
        url.save()

        return redirect(url.original_url)
