from celery import shared_task
from .serializers import CreateUrlSerializer
from rest_framework.exceptions import ValidationError

@shared_task
def create_short_url(data):
    serializer = CreateUrlSerializer(data=data)
    if not serializer.is_valid():
        raise ValidationError(serializer.errors)
    
    instance = serializer.save()
    return {
        'id': instance.id,
        'original_url': instance.original_url,
        'short_url': instance.short_url,
        'created_at': instance.created_at.isoformat(),
        'visits': instance.visits,
    }
