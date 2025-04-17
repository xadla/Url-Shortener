from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from celery.result import AsyncResult


from django.views import View
from django.shortcuts import redirect, get_object_or_404


from .models import Url
from .tasks import create_short_url
from accounts.auth_handler import CookieJWTAuthentication
from url.celery import app
from .serializers import CreateUrlSerializer


class CreateShortURL(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = CreateUrlSerializer(data=data)

        if serializer.is_valid():
            task = create_short_url.delay(data)
            return Response(
                {
                    "message": "Processing request asynchronously",
                    "task_id": str(task.id)
                },
                status=status.HTTP_202_ACCEPTED
            )

        return Response(
            {
                "message": "This URL is shorted before",
            },
            status.HTTP_202_ACCEPTED,
        )


class GetTaskResult(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        try:
            task_id_str = str(task_id)
            task_result = AsyncResult(task_id_str, app=app)
            
            if task_result.failed():
                return Response(
                    {"error": "Task failed", "detail": str(task_result.result)},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            if not task_result.ready():
                return Response({"status": "pending"}, status=status.HTTP_202_ACCEPTED)
                
            result = task_result.result
            if isinstance(result, dict) and "short_url" in result:
                return Response({"short_url": result["short_url"]}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": result.get("error", "Unknown task result format")},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        except Exception as e:
            return Response(
                {"error": "Failed to check task status", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RenderShortedURL(View):

    def get(self, request, short_url):

        url = get_object_or_404(Url, short_url=short_url)
        url.visits += 1
        url.save()
        return redirect(url.original_url)
