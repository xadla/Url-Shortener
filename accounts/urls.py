from django.urls import path

from .views import UserAPI


app_name = "accounts"
urlpatterns = [
    path("user/", UserAPI.as_view(), name="user"),
]
