from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes


from django.middleware.csrf import get_token


from .serializers import UserSerializer, UserRegisterSerializer, UserTokenSerializer
from .models import User



@api_view(["GET"])
@permission_classes([AllowAny])
def get_csrf_token(request):
    return Response({"csrfToken": get_token(request)}, status=status.HTTP_200_OK)


@api_view(["POST"])
def logout_user(request):
    response = Response({"message": "Logged out"})
    response.delete_cookie("access_token")
    return response


class UserRegisterAPI(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        username = request.query_params.get("username")

        if not username:
            return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()  # Create and save user
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPI(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = UserTokenSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)

            response = Response({"message": "Login Successful",},status=status.HTTP_200_OK)

            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True, # prevents access from js
                secure=False, # set True in production
                samesite='None',
            )
            return response

        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


# Not completed!
class CheckUserAPI(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "isAuthenticated": True,
            "user": {
                "ID": request.user.id,
                "username": request.user.username
            }
        }, status=status.HTTP_200_OK)
