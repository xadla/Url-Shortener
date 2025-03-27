from django.urls import path


from .views import CreateShortURL, RenderShortedURL


app_name = "urls"
urlpatterns = [
    path("create/", CreateShortURL.as_view(), name="create"),
    path("<str:short_url>/", RenderShortedURL.as_view(), name="render"),
]
