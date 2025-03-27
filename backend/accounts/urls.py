from django.urls import path


from .views import UserAPI, AuthTokenAPI


app_name = "accounts"
urlpatterns = [
    path("user/", UserAPI.as_view(), name="user"),
    path("api/api-user-token/", AuthTokenAPI.as_view(), name="token"),
]
