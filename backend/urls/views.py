from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from django.views import View
from django.shortcuts import redirect, get_object_or_404


from .models import Url
from .tasks import create_short_url


class CreateShortURL(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        task = create_short_url.delay(data)
        return Response(
            {
                "message": "Processing request asynchronously",
                "task_id": task.id
            },
            status=status.HTTP_202_ACCEPTED
        )


class RenderShortedURL(View):

    def get(self, request, short_url):

        url = get_object_or_404(Url, short_url=short_url)
        url.visits += 1
        url.save()
        return redirect(url.original_url)
