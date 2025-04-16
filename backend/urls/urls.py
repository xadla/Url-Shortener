from django.urls import path


from .views import CreateShortURL, RenderShortedURL, GetTaskResult


app_name = "urls"
urlpatterns = [
    path("create/", CreateShortURL.as_view(), name="create"),
    path("<str:short_url>/", RenderShortedURL.as_view(), name="render"),
    path("tasks/<uuid:task_id>/", GetTaskResult.as_view(), name="task_result"),
]
