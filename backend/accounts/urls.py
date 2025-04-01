from django.urls import path


from .views import UserRegisterAPI, UserLoginAPI, logout_user, get_csrf_token


app_name = "auth"
urlpatterns = [
    path("register/", UserRegisterAPI.as_view(), name="register"),
    path("login/", UserLoginAPI.as_view(), name="login"),
    path("logout/", logout_user, name="logout"),
    path("get/csrf/", get_csrf_token, name="get_csrf"),
]
